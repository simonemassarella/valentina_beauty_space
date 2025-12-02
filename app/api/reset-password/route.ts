import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Database temporaneo per token - in produzione usare tabella dedicata
const resetTokens = new Map<string, { email: string; expires: Date }>();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token e password sono obbligatori' },
        { status: 400 }
      );
    }

    // Verifica token
    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expires < new Date()) {
      return NextResponse.json(
        { message: 'Token non valido o scaduto' },
        { status: 400 }
      );
    }

    // Aggiorna password utente
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // In produzione: update utente nel database
    // await prisma.user.update({
    //   where: { email: tokenData.email },
    //   data: { password: hashedPassword }
    // });

    // Per ora solo log
    console.log(`Password aggiornata per: ${tokenData.email}`);

    // Rimuovi token usato
    resetTokens.delete(token);

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

  const tokenData = resetTokens.get(token);

  if (!tokenData || tokenData.expires < new Date()) {
    return NextResponse.json(
      { message: 'Token non valido o scaduto' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { email: tokenData.email },
    { status: 200 }
  );
}
