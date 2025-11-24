import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import AuthProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Centro Estetico Valentina',
  description: 'Prenotazioni online, area clienti e gestione admin per il centro estetico.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="main-bg-gradient">
        <AuthProvider>
          <Navbar />
          <main className="container py-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
