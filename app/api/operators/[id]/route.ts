import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const operatorSchema = z.object({
  name: z.string().min(1).optional(),
  startHour: z.number().int().min(0).max(23).optional(),
  endHour: z.number().int().min(1).max(23).optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const op = await prisma.operator.findUnique({ where: { id: params.id } });
  if (!op) {
    return NextResponse.json({ message: 'Operatore non trovato' }, { status: 404 });
  }
  return NextResponse.json(op);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const json = await req.json();
  const parsed = operatorSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const op = await prisma.operator.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json(op);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  await prisma.operator.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
