import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const updateSchema = z.object({
  status: z.enum(['CONFIRMED', 'CANCELLED']).optional(),
});

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Non autenticato' }, { status: 401 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: params.id } });
  if (!booking) {
    return NextResponse.json({ message: 'Prenotazione non trovata' }, { status: 404 });
  }

  const isAdmin = (session.user as any).role === 'ADMIN';

  if (!isAdmin && booking.userId !== session.user.id) {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const now = new Date();
  if (!isAdmin && booking.start <= now) {
    return NextResponse.json({ message: 'Non puoi annullare una prenotazione passata' }, { status: 400 });
  }

  await prisma.booking.update({
    where: { id: params.id },
    data: { status: 'CANCELLED' },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: params.id } });
  if (!booking) {
    return NextResponse.json({ message: 'Prenotazione non trovata' }, { status: 404 });
  }

  const json = await req.json();
  const parsed = updateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id: params.id },
    data: parsed.data,
    include: { service: true, operator: true, user: true },
  });

  return NextResponse.json(updated);
}
