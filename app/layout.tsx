import type { Metadata } from 'next';
import { Sora, Fraunces } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import AuthProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';
import LayoutChrome from '@/components/LayoutChrome';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'Centro Estetico Valentina',
  description: 'Prenotazioni online, area clienti e gestione admin per il centro estetico.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={fraunces.variable}>
      <body className={`main-bg-gradient ${sora.className}`}>
        <AuthProvider>
          <ScrollRevealProvider>
            <LayoutChrome navbar={<Navbar />} footer={<Footer />}>
              {children}
            </LayoutChrome>
          </ScrollRevealProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
