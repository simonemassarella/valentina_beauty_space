import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Errore interno.' }, { status: 500 });
  }
}
