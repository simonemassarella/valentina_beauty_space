import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const operatorSchema = z.object({
  name: z.string().min(1),
  startHour: z.number().int().min(0).max(23).optional(),
  endHour: z.number().int().min(1).max(23).optional(),
});

export async function GET() {
  const operators = await prisma.operator.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(operators);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const json = await req.json();
  const parsed = operatorSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const { name, startHour, endHour } = parsed.data;

  const op = await prisma.operator.create({
    data: {
      name,
      startHour: startHour ?? 9,
      endHour: endHour ?? 18,
    },
  });

  return NextResponse.json(op, { status: 201 });
}
