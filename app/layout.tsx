import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { AuthProvider } from '@/lib/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  authors: [
    {
      name: 'Raffaele Valenti',
      url: 'https://www.raffaelevalenti.it/',
    },
    {
      name: 'A.S.D. Gli Orchi Trieste',
      url: 'https://orchisoftair-website.vercel.app/',
    },
  ],
  description:
    "Sei pront* a vivere l'emozione del softair a Trieste? Dal 2007, l'A.S.D. Gli Orchi Trieste è il punto di riferimento per gli appassionati che vogliono mettere alla prova le proprie abilità in un ambiente stimolante e divertente. Entra a far parte della nostra community! Iscriviti alla newsletter per non perderti neanche un evento o una novità. Ti aspettiamo!",
  title: process.env.NEXT_PUBLIC_BASSE_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <meta httpEquiv="Content-Language" content="it" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        id="root"
      >
        <AuthProvider>
          <div className="min-h-screen bg-orchi text-orchi-light">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
