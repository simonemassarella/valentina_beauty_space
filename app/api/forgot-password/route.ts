import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email è obbligatoria' },
        { status: 400 }
      );
    }

    // Genera token sicuro
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 ora

    // Salva token in database (SQL diretto)
    await prisma.$executeRawUnsafe(
      'INSERT INTO "PasswordResetToken" (token, email, "expiresAt") VALUES ($1, $2, $3)',
      resetToken,
      email,
      expires
    );

    // Pulisci token scaduti (SQL diretto)
    await prisma.$executeRawUnsafe(
      'DELETE FROM "PasswordResetToken" WHERE "expiresAt" < NOW()'
    );

    // Invia email con link reset
    const emailSent = await sendPasswordResetEmail(email, resetToken);

    if (!emailSent) {
      return NextResponse.json(
        { message: 'Errore nell\'invio dell\'email. Riprova più tardi.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email di recupero inviata con successo',
        email: email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'Errore del server durante il recupero password' },
      { status: 500 }
    );
  }
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
