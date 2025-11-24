import { NextResponse } from 'next/server';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { prisma } from '@/lib/prisma';
import { mailer } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await prisma.settings.findFirst();
  if (settings && !settings.sendWhatsAppReminders) {
    return NextResponse.json({ skipped: true, reason: 'Reminders disabilitati' });
  }

  const timezone = settings?.timezone ?? process.env.APP_TIMEZONE ?? 'Europe/Rome';

  const now = new Date();
  const zonedNow = utcToZonedTime(now, timezone);
  const tomorrow = addDays(zonedNow, 1);
  const tomorrowStartLocal = startOfDay(tomorrow);
  const tomorrowEndLocal = endOfDay(tomorrow);

  const tomorrowStartUtc = zonedTimeToUtc(tomorrowStartLocal, timezone);
  const tomorrowEndUtc = zonedTimeToUtc(tomorrowEndLocal, timezone);

  const bookings = await prisma.booking.findMany({
    where: {
      status: 'CONFIRMED',
      start: { gte: tomorrowStartUtc, lte: tomorrowEndUtc },
    },
    include: { user: true, service: true, operator: true },
    orderBy: { start: 'asc' },
  });

  if (!bookings.length) {
    return NextResponse.json({ count: 0 });
  }

  const from = process.env.NOTIFY_GMAIL_USER;

  if (!from) {
    return NextResponse.json({ message: 'Config Gmail mancante' }, { status: 500 });
  }

  let sent = 0;

  for (const b of bookings) {
    if (!b.user?.email) continue;

    const zonedStart = utcToZonedTime(b.start, timezone);
    const date = format(zonedStart, 'yyyy-MM-dd');
    const time = format(zonedStart, 'HH:mm');
    const clientName = `${b.user.name} ${b.user.surname}`.trim();

    try {
      await mailer.sendMail({
        from,
        to: b.user.email,
        subject: 'Promemoria appuntamento - Centro Estetico Valentina',
        text: `Ciao ${clientName},\n\nTi ricordiamo il tuo appuntamento di domani:\n\n- Servizio: ${b.service.name}\n- Operatrice: ${b.operator.name}\n- Data: ${date}\n- Ora: ${time}\n\nSe non puoi venire, puoi annullare la prenotazione dalla tua area clienti.\n\nA presto,\nCentro Estetico Valentina`,
      });
      sent += 1;
    } catch (error) {
      console.error("Errore nell'invio dell'email di promemoria", error);
    }
  }

  return NextResponse.json({ count: bookings.length, sent });
}
