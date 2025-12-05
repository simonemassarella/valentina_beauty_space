import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token e password sono obbligatori' },
        { status: 400 }
      );
    }

    // Verifica token in database (SQL diretto)
    const rows: any[] = await prisma.$queryRawUnsafe(
      'SELECT email, "expiresAt" FROM "PasswordResetToken" WHERE token = $1 LIMIT 1',
      token
    );

    const tokenRow = rows[0];

    if (!tokenRow || new Date(tokenRow.expiresAt) < new Date()) {
      return NextResponse.json(
        { message: 'Token non valido o scaduto' },
        { status: 400 }
      );
    }

    // Aggiorna password utente
    const hashedPassword = await bcrypt.hash(password, 10);

    // Aggiorna utente nel database
    await prisma.user.update({
      where: { email: tokenRow.email },
      data: { passwordHash: hashedPassword },
    });

    // Rimuovi token usato (SQL diretto)
    await prisma.$executeRawUnsafe(
      'DELETE FROM "PasswordResetToken" WHERE token = $1',
      token
    );

    return NextResponse.json(
      { message: 'Password aggiornata con successo' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Errore del server durante il reset password' },
      { status: 500 }
    );
  }

  // Codice precedente per generazione token...
}

// Verifica token per pagina reset
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { message: 'Token mancante' },
      { status: 400 }
    );
  }

  const rows: any[] = await prisma.$queryRawUnsafe(
    'SELECT email, "expiresAt" FROM "PasswordResetToken" WHERE token = $1 LIMIT 1',
    token
  );

  const tokenRow = rows[0];

  if (!tokenRow || new Date(tokenRow.expiresAt) < new Date()) {
    return NextResponse.json(
      { message: 'Token non valido o scaduto' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { email: tokenRow.email },
    { status: 200 }
  );
}
