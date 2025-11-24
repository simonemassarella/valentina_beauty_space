import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const serviceSchema = z.object({
  name: z.string().min(1),
  duration: z.number().int().min(5).max(8 * 60),
  price: z.number().nonnegative(),
  category: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  imageUrl: z.string().min(1).optional(),
  operatorIds: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const all = url.searchParams.get('all') === '1';

  if (all) {
    const session = await getServerSession(authOptions);
    const isAdmin = session && (session.user as any).role === 'ADMIN';

    if (!isAdmin) {
      return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
    }

    const services = await prisma.service.findMany({
      orderBy: { duration: 'asc' },
      include: {
        operators: {
          select: { id: true, name: true },
        },
      },
    });
    return NextResponse.json(services);
  }

  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { duration: 'asc' },
    include: {
      operators: {
        select: { id: true, name: true },
      },
    },
  });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorizzato' }, { status: 403 });
  }

  const json = await req.json();
  const parsed = serviceSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dati non validi' }, { status: 400 });
  }

  const { name, duration, price, category, description, imageUrl, operatorIds, active } = parsed.data;

  const service = await prisma.service.create({
    data: {
      name,
      duration,
      price,
      category,
      description,
      imageUrl,
      active: active ?? true,
      operators: operatorIds
        ? {
            connect: operatorIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      operators: {
        select: { id: true, name: true },
      },
    },
  });

  return NextResponse.json(service, { status: 201 });
}
