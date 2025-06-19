import type { Metadata } from 'next';
import { Anton, Bebas_Neue, Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/auth-context';

import './globals.css';
import { cn } from '@/lib/utils';

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: '400',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
});

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
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
  description: `Sei pront* a vivere l\`emozione del softair a Trieste? Dal ${process.env.NEXT_PUBLIC_CREATION_YEAR}, l\`A.S.D. Gli Orchi Trieste è il punto di riferimento per gli appassionati che vogliono mettere alla prova le proprie abilità in un ambiente stimolante e divertente. Entra a far parte della nostra community! Iscriviti alla newsletter per non perderti neanche un evento o una novità. Ti aspettiamo!`,
  title: process.env.NEXT_PUBLIC_BASSE_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn(anton.variable, bebasNeue.variable, inter.variable)} lang="it" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Language" content="it" />
      </head>
      <body className={cn('antialiased', anton.className, bebasNeue.className, inter.className)} id="root">
        <AuthProvider>{children}</AuthProvider>

        <Toaster expand position="bottom-center" richColors />
      </body>
    </html>
  );
}
