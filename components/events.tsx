'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase';
import Event from '@/types/event';

import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import Loader from './ui/loader';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', dayjs().toISOString())
        .order('start_date', { ascending: true })
        .limit(3);

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
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-orchi relative overflow-hidden" id="eventi">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          animate="animate"
          className="my-auto"
          initial="initial"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <h2 className="display-text text-5xl md:text-6xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
            PROSSIMI EVENTI
          </h2>

          <p className="text-orchi-light/90 mb-10 text-lg leading-relaxed">
            Unisciti a noi nei prossimi eventi! Che si tratti di tornei competitivi o sessioni di allenamento, ogni
            occasione è perfetta per mettersi alla prova, imparare e vivere la vera adrenalina del softair.
          </p>
        </motion.div>

        <motion.div
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          {events.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                <span className="tactical-text text-2xl text-orchi-light mb-2">
                  Non ci sono prossimi eventi in programma!
                </span>

                <span className="text-orchi-light/75">
                  Non ci sono prossimi eventi in calendario al momento, ma non temere: siamo costantemente all'opera per
                  creare nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio questa
                  pagina per tutti gli aggiornamenti!
                </span>
              </div>
            )
          ) : (
            events.map((event) => (
              <Card
                className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 overflow-hidden flex flex-col"
                key={event.id}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <motion.div className="w-full h-full" layoutId={`card-image-${event.id}`}>
                    <Image
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      height={512}
                      src={event.image_url || '/event-placeholder.webp'}
                      width={512}
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
                  <div className="space-y-3 mb-4">
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

        <div className="flex items-center justify-center mt-12">
          <Link
            className="flex flex-col items-center justify-center h-auto w-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
            href="/events"
          >
            TUTTI GLI EVENTI
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
