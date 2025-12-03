import nodemailer from 'nodemailer';

// Usa le credenziali Gmail esistenti nel .env
const hasSmtpConfig = process.env.NOTIFY_GMAIL_USER && process.env.NOTIFY_GMAIL_APP_PASSWORD;

// Configurazione transporter Nodemailer con Gmail
const transporter = hasSmtpConfig ? nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NOTIFY_GMAIL_USER,
    pass: process.env.NOTIFY_GMAIL_APP_PASSWORD,
  },
}) : null;

export async function sendPasswordResetEmail(email: string, resetToken?: string) {
  try {
    // Se non c'è configurazione SMTP, logga e simula successo
    if (!transporter) {
      console.log('SMTP non configurato - email simulata per:', email);
      console.log('Configura queste variabili ambiente nel .env:');
      console.log('- NOTIFY_GMAIL_USER');
      console.log('- NOTIFY_GMAIL_APP_PASSWORD');
      return true; // Simula successo per sviluppo
    }

    const resetUrl = resetToken 
      ? `${process.env.NEXTAUTH_URL || 'https://valentina-beauty-space.vercel.app'}/reset-password?token=${resetToken}`
      : `${process.env.NEXTAUTH_URL || 'https://valentina-beauty-space.vercel.app'}/forgot-password`;

    const mailOptions = {
      from: `"Valentina Beauty Space" <${process.env.NOTIFY_GMAIL_USER}>`,
      to: email,
      subject: 'Recupero Password - Valentina Beauty Space',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d63384; margin: 0;">Valentina Beauty Space</h1>
            <p style="color: #6c757d; margin: 5px 0;">Recupero Password</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0;">Ciao!</h2>
            <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
              Abbiamo ricevuto una richiesta per recuperare la password del tuo account. 
              Se non hai richiesto tu il recupero, puoi ignorare questa email.
            </p>
            
            ${resetToken ? `
              <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
                Per reimpostare la tua password, clicca sul pulsante qui sotto:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #d63384; color: white; padding: 12px 30px; 
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reimposta Password
                </a>
              </div>
              <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">
                Se il pulsante non funziona, copia e incolla questo link nel browser:<br>
                <span style="word-break: break-all;">${resetUrl}</span>
              </p>
            ` : `
              <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
                Per reimpostare la tua password, contatta direttamente il centro:
              </p>
              <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Telefono:</strong> +39 3758218542</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> info@valentinabeautyspace.com</p>
                <p style="margin: 5px 0;"><strong>Indirizzo:</strong> Via Cuneo, 3, 04022 Fondi LT</p>
              </div>
            `}
          </div>
          
          <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
            <p style="margin: 5px 0;">© 2024 Valentina Beauty Space. Tutti i diritti riservati.</p>
            <p style="margin: 5px 0;">Via Cuneo, 3, 04022 Fondi (LT) - Italia</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Verifica configurazione SMTP
export async function verifySmtpConfig() {
  if (!transporter) {
    console.log('SMTP non configurato - usa modalità sviluppo');
    return false;
  }

  try {
    await transporter.verify();
    console.log('SMTP server is ready to send messages');
    return true;
  } catch (error) {
    console.error('SMTP configuration error:', error);
    return false;
  }
}
