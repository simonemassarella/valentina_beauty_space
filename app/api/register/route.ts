import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { mailer } from '@/lib/mailer';

const registerSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Dati non validi.' }, { status: 400 });
    }

    const { name, surname, phone, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'Esiste già un account con questa email.' }, { status: 400 });
    }

    const userCount = await prisma.user.count();
    const role = userCount === 0 ? 'ADMIN' : 'CLIENT';

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        surname,
        phone,
        email,
        passwordHash,
        role,
      },
    });

    if (process.env.NOTIFY_GMAIL_USER) {
      try {
        const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
        const areaClientiUrl = `${baseUrl}/dashboard`;

        await mailer.sendMail({
          from: process.env.NOTIFY_GMAIL_USER,
          to: email,
          subject: 'Benvenuto nell\'area clienti - Centro Estetico Valentina',
          text:
            `Ciao ${name} ${surname},\n\n` +
            'il tuo account per l\'area clienti del Centro Estetico Valentina è stato creato correttamente.\n' +
            'Ora puoi accedere per gestire le tue prenotazioni e il tuo profilo.\n\n' +
            'Puoi entrare subito nella tua area clienti da qui:\n' +
            `${areaClientiUrl}\n\n` +
            'A presto,\nCentro Estetico Valentina',
        });
      } catch (mailError) {
        console.error('Errore nell\'invio della mail di benvenuto', mailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Errore interno.' }, { status: 500 });
  }
}
