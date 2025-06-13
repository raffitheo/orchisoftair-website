'use client';

import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Calendar, Home, Images, Link2, Mail, Users } from 'lucide-react';
import Link from 'next/link';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | 404 - Obiettivo non trovato`;
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              animate="animate"
              className="mb-12"
              initial="initial"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orchi-red to-orchi-gold rounded-full mb-8">
                <AlertTriangle className="h-12 w-12 text-white" />
              </div>

              <h1 className="display-text text-8xl md:text-9xl text-orchi-light mb-8">404</h1>

              <h2 className="tactical-text text-2xl md:text-3xl text-orchi-light mb-6">OBIETTIVO NON TROVATO</h2>

              <p className="text-orchi-light/80 text-lg mb-8 leading-relaxed">
                La pagina che stai cercando non è stata trovata. Potrebbe essere stata eliminata, spostata o forse non è
                mai esistita.
              </p>
            </motion.div>

            <motion.div
              animate="animate"
              className="mb-12"
              initial="initial"
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                    <Home className="h-8 w-8 my-auto" />
                    CAMPO BASE
                  </CardTitle>

                  <CardDescription className="text-orchi-light/70 pt-4">
                    Torna alla homepage per iniziare una nuova missione
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Link
                    className="inline-block rounded-lg bg-orchi-red hover:bg-orchi-gold text-white tactical-text transform hover:scale-105 h-12 py-3 px-8 transition-all duration-300"
                    href="/"
                  >
                    TORNA ALLA HOME
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              animate="animate"
              initial="initial"
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                    <Link2 className="h-8 w-8 my-auto" />
                    LINK RAPIDI
                  </CardTitle>

                  <CardDescription className="text-orchi-light/70 pt-4">
                    Accesso diretto alle sezioni principali
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                      className="group flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href="/events"
                    >
                      <Calendar className="w-8 h-8 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="tactical-text text-xs">GLI EVENTI</span>
                    </Link>

                    <Link
                      className="group flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href="/team"
                    >
                      <Users className="w-8 h-8 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="tactical-text text-xs">LA SQUADRA</span>
                    </Link>

                    <Link
                      className="group flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href="/gallery"
                    >
                      <Images className="w-8 h-8 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="tactical-text text-xs">GALLERIA ORCHI</span>
                    </Link>

                    <Link
                      className="group flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href="/contact-us"
                    >
                      <Mail className="w-8 h-8 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="tactical-text text-xs">SCRIVICI ORA</span>
                    </Link>

                    <Button
                      className="group h-auto col-span-2 md:col-span-4 bg-transparent border-2 border-orchi-gray/50 text-orchi-light hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      TORNA INDIETRO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
