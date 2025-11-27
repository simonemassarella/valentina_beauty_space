import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import AuthProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

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
      <body className={`main-bg-gradient ${sora.className}`}>
        <AuthProvider>
          <ScrollRevealProvider>
            <Navbar />
            <main className="container page-animated">{children}</main>
            <Footer />
          </ScrollRevealProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
