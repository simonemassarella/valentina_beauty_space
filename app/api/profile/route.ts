import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const profileSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().min(6),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Non autenticato' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, surname: true, phone: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ message: 'Utente non trovato' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Non autenticato' }, { status: 401 });
  }

  const json = await req.json();
  const parsed = profileSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const { name, surname, phone } = parsed.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, surname, phone },
  });

  return NextResponse.json({ success: true });
}
