'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { supabase } from '@/lib/supabase';
import Event from '@/types/event';

import 'dayjs/locale/it';

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsKey, setEventsKey] = useState(dayjs().valueOf());
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (loading) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento eventi...`;
    else {
      if (events) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Gli eventi`;
      else document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessun evento trovato`;
    }
  }, [events, loading]);

  useEffect(() => {
    setLoading(true);
    setEvents([]);

    fetchEvents();
  }, [selectedYear]);

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', dayjs(`01 01 ${selectedYear}`).toISOString())
        .lte('start_date', dayjs(`12 31 ${selectedYear}`).toISOString())
        .order('start_date', { ascending: false })
        .limit(12);

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il caricamento degli eventi. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoading(false);
      setEventsKey(dayjs().valueOf());
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-orchi text-orchi-light relative overflow-hidden">
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
              GLI EVENTI
            </h1>

            <p className="text-orchi-light/90 text-xl leading-relaxed">
              Il nostro calendario è sempre ricco di appuntamenti pensati per ogni tipo di giocatore, dal neofita
              all’appassionato più esperto.
              <br />
              Partecipa a tornei adrenalinici, allenamenti strategici e giocate immersive che mettono alla prova
              tecnica, resistenza e spirito di squadra. Ogni evento è un’occasione per crescere, divertirsi e vivere il
              softair nella sua forma più autentica.
            </p>
          </motion.div>

          <motion.div
            animate="animate"
            className="mb-12"
            initial="initial"
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                <Button
                  className={selectedYear === year ? 'cursor-not-allowed bg-orchi-gold hover:scale-100' : ''}
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  tabIndex={selectedYear === year ? -1 : undefined}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  EVENTI {year}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            key={eventsKey}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            {events.length === 0 ? (
              loading ? (
                <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                  <Loader className="m-auto" text="Caricamento in corso..." />
                </div>
              ) : (
                <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                  <span className="tactical-text text-2xl text-orchi-light mb-2">Non ci sono eventi in programma!</span>

                  <span className="text-orchi-light/75">
                    Non ci sono eventi in programma al momento, ma non temere: siamo costantemente all'opera per creare
                    nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio questa
                    pagina per tutti gli aggiornamenti!
                  </span>
                </div>
              )
            ) : (
              events.map((event) => (
                <Card
                  className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 overflow-hidden flex flex-col"
                  key={event.id}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <motion.div className="aspect-video w-full h-auto" layoutId={`card-image-${event.id}`}>
                      <Image
                        alt={event.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        fill
                        src={event.image_url || '/event-placeholder.webp'}
                        quality={100}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-orchi/80 to-transparent" />

                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orchi-red to-orchi-gold text-white px-3 py-1 rounded-full text-sm tactical-text">
                      {dayjs(event.start_date).locale('it').format('DD MMM YYYY').toUpperCase()}
                      {event.end_date
                        ? ` - ${dayjs(event.end_date).locale('it').format('DD MMM YYYY').toUpperCase()}`
                        : ''}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="display-text text-3xl md:text-4xl text-white mb-1">{event.title}</h3>

                      <p className="text-orchi-gold text-sm">
                        {event.event_type === 'tournament'
                          ? 'Torneo'
                          : event.event_type === 'training'
                            ? 'Allenamento'
                            : 'Partita'}
                      </p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardDescription className="text-orchi-light/90 leading-relaxed whitespace-pre-line line-clamp-3">
                      {(event.description || 'Nessuna descrizione disponibile.').replace(/\\n/g, '\n')}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto p-6 pt-0">
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-orchi-light/80">Luogo:</span>

                        <span className="text-orchi-light text-sm">{event.location}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-orchi-light/80">Partecipanti:</span>

                        <span className="text-orchi-gold text-sm font-semibold">{event.participants.length}</span>
                      </div>
                    </div>

                    <Link
                      className="flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                      href={`/events/${event.id}`}
                    >
                      DETTAGLI EVENTO
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
