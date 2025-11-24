import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const serviceSchema = z.object({
  name: z.string().min(1).optional(),
  duration: z.number().int().min(5).max(8 * 60).optional(),
  price: z.number().nonnegative().optional(),
  category: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().min(1).optional(),
  operatorIds: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) {
    return NextResponse.json({ message: 'Servizio non trovato' }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const json = await req.json();
  const parsed = serviceSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const { operatorIds, ...rest } = parsed.data;

  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      ...rest,
      operators: operatorIds
        ? {
            set: operatorIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      operators: {
        select: { id: true, name: true },
      },
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  try {
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Errore nella cancellazione del servizio', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return NextResponse.json(
        {
          message:
            'Impossibile eliminare questo servizio perché esistono prenotazioni collegate. ' +
            'Puoi disattivarlo oppure prima cancellare/archiviare le prenotazioni associate.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Errore interno nella cancellazione del servizio.' }, { status: 500 });
  }
}
