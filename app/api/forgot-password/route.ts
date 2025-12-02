import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

// Database temporaneo per token - in produzione usare tabella dedicata
const resetTokens = new Map<string, { email: string; expires: Date }>();

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

    // Salva token (in produzione: database)
    resetTokens.set(resetToken, { email, expires });

    // Pulisci token scaduti
    for (const [token, data] of resetTokens.entries()) {
      if (data.expires < new Date()) {
        resetTokens.delete(token);
      }
    }

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
