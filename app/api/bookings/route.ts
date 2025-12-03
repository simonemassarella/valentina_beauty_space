import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { mailer } from '@/lib/mailer';
import { createCenterCalendarEvent } from '@/lib/googleCalendar';

const bookingSchema = z.object({
  operatorId: z.string().min(1),
  serviceId: z.string().min(1),
  date: z.string().min(8), // YYYY-MM-DD
  time: z.string().min(4), // HH:mm
});

function getTimezone() {
  return process.env.APP_TIMEZONE ?? 'Europe/Rome';
}

function getLocalParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';

  const year = get('year');
  const month = get('month');
  const day = get('day');
  const hour = get('hour');
  const minute = get('minute');
  const second = get('second');

  return { year, month, day, hour, minute, second };
}

function toGoogleDateTimeLocal(date: Date, timeZone: string) {
  const { year, month, day, hour, minute, second } = getLocalParts(date, timeZone);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

function toICSDateTimeLocal(date: Date, timeZone: string) {
  const { year, month, day, hour, minute, second } = getLocalParts(date, timeZone);
  return `${year}${month}${day}T${hour}${minute}${second}`;
}

function escapeICSText(text: string) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  // Modalità pubblica per calcolo slot liberi (non richiede autenticazione)
  if (url.searchParams.get('slots') === '1') {
    const operatorId = url.searchParams.get('operatorId');
    const date = url.searchParams.get('date');

    if (!operatorId || !date) {
      return NextResponse.json({ message: 'Parametri mancanti' }, { status: 400 });
    }

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59.999`);

    const bookings = await prisma.booking.findMany({
      where: {
        operatorId,
        status: 'CONFIRMED',
        start: { gte: dayStart, lte: dayEnd },
      },
      select: { id: true, start: true, end: true },
      orderBy: { start: 'asc' },
    });

    return NextResponse.json(bookings);
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Non autenticato' }, { status: 401 });
  }

  const isAdmin = (session.user as any).role === 'ADMIN';
  const all = url.searchParams.get('all') === '1';
  const operatorId = url.searchParams.get('operatorId') ?? undefined;
  const date = url.searchParams.get('date') ?? undefined;
  const userEmail = url.searchParams.get('userEmail') ?? undefined;
  const upcoming = url.searchParams.get('upcoming') === '1';
  const month = url.searchParams.get('month') ?? undefined; // YYYY-MM

  const where: any = {};

  if (isAdmin && all) {
    // admin: lista completa con eventuali filtri
    if (operatorId) where.operatorId = operatorId;
    if (userEmail) {
      where.user = { email: userEmail };
    }
  } else {
    // cliente: solo le proprie prenotazioni
    where.userId = session.user.id;
  }

  if (month) {
    const [yearStr, monthStr] = month.split('-');
    const yearNum = Number(yearStr);
    const monthNum = Number(monthStr);

    if (!Number.isNaN(yearNum) && !Number.isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
      const monthStart = new Date(yearNum, monthNum - 1, 1, 0, 0, 0, 0);
      const monthEnd = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);
      where.start = { ...(where.start ?? {}), gte: monthStart, lte: monthEnd };
    }
  } else if (date) {
    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59.999`);
    where.start = { gte: dayStart, lte: dayEnd };
  } else if (!date && (!isAdmin || !all) && upcoming) {
    const now = new Date();
    where.start = { ...(where.start ?? {}), gte: now };
  }

  const include: any = { service: true, operator: true };
  if (isAdmin && all) {
    include.user = true;
  }

  const bookings = await prisma.booking.findMany({
    where,
    include,
    orderBy: { start: 'asc' },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Non autenticato' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = bookingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const { operatorId, serviceId, date, time } = parsed.data;

const service = await prisma.service.findUnique({ where: { id: serviceId } });
const operator = await prisma.operator.findUnique({ where: { id: operatorId } });
const user = await prisma.user.findUnique({ where: { id: session.user.id } });

if (!service) {
  return NextResponse.json({ message: 'Servizio non trovato (ambiente di produzione)' }, { status: 404 });
}

if (!operator) {
  return NextResponse.json({ message: 'Operatrice non trovata (ambiente di produzione)' }, { status: 404 });
}

if (!user) {
  return NextResponse.json({ message: 'Utente non trovato nel database (contatta il supporto)' }, { status: 404 });
}

  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + service.duration * 60 * 1000);

  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ message: 'Data/ora non valide' }, { status: 400 });
  }

  const now = new Date();
  if (start <= now) {
    return NextResponse.json({ message: 'Non puoi prenotare nel passato' }, { status: 400 });
  }

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const workStart = operator.startHour * 60;
  const workEnd = operator.endHour * 60;

  if (startMinutes < workStart || endMinutes > workEnd) {
    return NextResponse.json({ message: 'Orario fuori dall\'orario di lavoro dell\'operatrice' }, { status: 400 });
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      operatorId,
      status: 'CONFIRMED',
      start: { lt: end },
      end: { gt: start },
    },
  });

  if (overlapping) {
    return NextResponse.json({ message: 'Fascia oraria non disponibile' }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      operatorId,
      serviceId,
      start,
      end,
    },
    include: { service: true, operator: true },
  });

  const timezone = getTimezone();

  let icsContent: string | null = null;

  try {
    const dtStart = toICSDateTimeLocal(booking.start, timezone);
    const dtEnd = toICSDateTimeLocal(booking.end, timezone);
    const dtStamp = toICSDateTimeLocal(new Date(), timezone);
    const summary = escapeICSText(`${booking.service.name} con ${booking.operator.name}`);
    const description = escapeICSText(
      `Cliente: ${user.name} ${user.surname}\nServizio: ${booking.service.name}\nOperatrice: ${booking.operator.name}`,
    );

    icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Centro Estetico Valentina//Prenotazioni//IT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${booking.id}@centro-estetico-valentina`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
      '',
    ].join('\r\n');
  } catch (error) {
    console.error('Errore nella generazione del file ICS', error);
  }

  if (process.env.NOTIFY_GMAIL_USER) {
    try {
      const dateStr = booking.start.toLocaleDateString('it-IT', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const timeStr = booking.start.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      await mailer.sendMail({
        from: process.env.NOTIFY_GMAIL_USER,
        to: user.email,
        subject: 'Conferma prenotazione - Centro Estetico Valentina',
        text: `Ciao ${user.name} ${user.surname},\n\nla tua prenotazione è confermata.\n\nDettagli:\n- Servizio: ${booking.service.name}\n- Operatrice: ${booking.operator.name}\n- Data: ${dateStr}\n- Ora: ${timeStr}\n\nPuoi aggiungere l'appuntamento al tuo calendario aprendo l'allegato.\n\nSe non puoi venire, puoi annullare la prenotazione dalla tua area clienti.\n\nA presto,\nCentro Estetico Valentina`,
        attachments: icsContent
          ? [
            {
              filename: 'prenotazione.ics',
              content: icsContent,
              contentType: 'text/calendar; charset=utf-8',
            },
          ]
          : undefined,
      });
    } catch (error) {
      console.error("Errore nell'invio dell'email di conferma prenotazione", error);
    }
  }

  try {
    const startDateTime = toGoogleDateTimeLocal(booking.start, timezone);
    const endDateTime = toGoogleDateTimeLocal(booking.end, timezone);

    await createCenterCalendarEvent({
      summary: `${booking.service.name} - ${user.name} ${user.surname}`,
      description: `Cliente: ${user.name} ${user.surname} (${user.email})\nServizio: ${booking.service.name}\nOperatrice: ${booking.operator.name}`,
      startDateTime,
      endDateTime,
      timezone,
    });
  } catch (error) {
    console.error('Errore nella creazione evento Google Calendar', error);
  }

  return NextResponse.json(booking, { status: 201 });
}
