'use client';

import { useEffect, useRef, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Calendar, Images, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { supabase } from '@/lib/supabase';

const AdminPage = () => {
  const { loadingAuth, profile } = useProtectedRoute(true, '/');

  const [eventsCount, setEventsCount] = useState(0);
  const [galleryImagesCount, setGalleryImagesCount] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(0);

  useEffect(() => {
    countEvents();
    countGalleryImages();
    countTeamMembers();

    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Pannello admin`;
  }, []);

  const countEvents = async () => {
    try {
      const { count: eventsCount, error: eventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      if (eventsError) throw eventsError;

      setEventsCount(eventsCount ?? 0);
    } catch (error) {
      console.error('Error counting events:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il conteggio degli eventi. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );

      setEventsCount(-1);
    }
  };

  const countGalleryImages = async () => {
    try {
      const { count: galleryImagesCount, error: galleryImagesError } = await supabase
        .from('gallery_images')
        .select('*', { count: 'exact', head: true });

      if (galleryImagesError) throw galleryImagesError;

      setGalleryImagesCount(galleryImagesCount ?? 0);
    } catch (error) {
      console.error('Error counting gallery images:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il conteggio delle immagini della galleria. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );

      setGalleryImagesCount(-1);
    }
  };

  const countTeamMembers = async () => {
    try {
      const { count: teamMembersCount, error: teamMembersError } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true });

      if (teamMembersError) throw teamMembersError;

      setTeamMembersCount(teamMembersCount ?? 0);
    } catch (error) {
      console.error('Error counting team members:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il conteggio dei membri della squadra. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );

      setTeamMembersCount(-1);
    }
  };

  const adminSections = [
    {
      description: 'Crea e gestisci eventi e tornei',
      icon: Calendar,
      path: '/admin/events',
      title: 'Gestione Eventi',
    },
    {
      description: 'Aggiungi, modifica e rimuovi membri della squadra',
      icon: Users,
      path: '/admin/team',
      title: 'Gestione Team',
    },
    {
      description: 'Carica ed organizza le immagini della galleria',
      icon: Images,
      path: '/admin/gallery',
      title: 'Gestione Galleria',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orchi via-orchi/95 to-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            animate="animate"
            className="mb-12"
            initial="initial"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <h1 className="display-text text-6xl md:text-8xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
              PANNELLO ADMIN
            </h1>

            <p className="text-orchi-light/90 text-xl leading-relaxed">
              Centro di controllo per la gestione del sito Gli Orchi Trieste ed i suoi contenuti.
            </p>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial="initial"
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">{eventsCount}</div>

                <div className="text-orchi-light/80 tactical-text">EVENTI ORGANIZZATI</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">{teamMembersCount}</div>

                <div className="text-orchi-light/80 tactical-text">MEMBRI ATTIVI</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Images className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">{galleryImagesCount}</div>

                <div className="text-orchi-light/80 tactical-text">IMMAGINI CARICATE</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">0</div>

                <div className="text-orchi-light/80 tactical-text">RICHIESTE DI CONTATTO</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            {adminSections.map((section, index) => {
              const IconComponent = section.icon;

              return (
                <Card
                  className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 overflow-hidden flex flex-col"
                  key={index}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orchi-gold to-orchi-red rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>

                    <CardTitle className="display-text text-3xl text-orchi-light">{section.title}</CardTitle>

                    <CardDescription className="text-orchi-light/70">{section.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Link
                      className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href={section.path}
                    >
                      APRI SERVIZIO
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
