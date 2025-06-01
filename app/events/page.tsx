'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';
import Loader from '@/components/ui/loader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Event from '@/types/event';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EventsPDFDocument from '@/components/pdf/events-pdf-document';

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (loading)
      document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento eventi...`;
    else {
      if (events)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Gli eventi`;
      else
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessun evento trovato`;
    }
  }, [events, loading]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte(
          'start_date',
          new Date(`01 01 ${new Date().getFullYear()}`).toISOString(),
        )
        .order('start_date', { ascending: false })
        .limit(12);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-28">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mt-10 mb-4">
          <Calendar className="text-orchi-red" size={32} />

          <h1 className="display-text text-5xl md:text-6xl text-orchi-light">
            GLI <span className="text-orchi-red">EVENTI</span>
          </h1>
        </div>

        <p className="text-orchi-light/70 mb-12">
          Il nostro calendario è sempre ricco di appuntamenti pensati per ogni
          tipo di giocatore, dal neofita all’appassionato più esperto.
          <br />
          Partecipa a tornei adrenalinici, allenamenti strategici e giocate
          immersive che mettono alla prova tecnica, resistenza e spirito di
          squadra. Ogni evento è un’occasione per crescere, divertirsi e vivere
          il softair nella sua forma più autentica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                  Non ci sono membri nella squadra!
                </span>

                <span className="text-center text-orchi-light/70 mx-auto mb-auto">
                  Non ci sono membri nella squadra al momento, ma non temere:
                  siamo costantemente all'opera per creare nuove ed
                  entusiasmanti attività e contenuti esclusivi per i nostri
                  soci! Tieni d'occhio questa pagina per tutti gli
                  aggiornamenti!
                </span>
              </div>
            )
          ) : (
            events.map((event) => (
              <Link
                className="block h-full"
                href={`/events/${event.id}`}
                key={event.id}
              >
                <Card className="bg-orchi-gray/30 border border-orchi-gray hover:border-orchi-gold transition-colors group h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${event.image_url || '/event-placeholder.webp'})`,
                      }}
                    />
                  </div>

                  <CardHeader
                    className={`p-1 ${
                      event.event_type === 'tournament'
                        ? 'bg-orchi-red'
                        : event.event_type === 'training'
                          ? 'bg-orchi-gold'
                          : 'bg-orchi-gray'
                    }`}
                  >
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="tactical-text text-white text-sm">
                        {event.event_type === 'tournament'
                          ? 'TORNEO'
                          : event.event_type === 'training'
                            ? 'ALLENAMENTO'
                            : 'PARTITA'}
                      </span>

                      <Calendar className="text-white" size={16} />
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="tactical-text text-2xl text-orchi-light mb-2 group-hover:text-orchi-gold transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex flex-row mb-4">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-orchi-red">
                          {dayjs(event.start_date).locale('it').format('DD')}
                        </span>

                        <div className="ml-2 flex flex-col">
                          <span className="text-orchi-gold uppercase">
                            {dayjs(event.start_date).locale('it').format('MMM')}
                          </span>

                          <span className="text-orchi-light">
                            {dayjs(event.start_date)
                              .locale('it')
                              .format('YYYY')}
                          </span>
                        </div>

                        {event.end_date && (
                          <>
                            <div className="text-orchi-light mx-4">-</div>

                            <span className="text-3xl font-bold text-orchi-red">
                              {dayjs(event.end_date!).locale('it').format('DD')}
                            </span>

                            <div className="ml-2 flex flex-col">
                              <span className="text-orchi-gold uppercase">
                                {dayjs(event.end_date!)
                                  .locale('it')
                                  .format('MMM')}
                              </span>

                              <span className="text-orchi-light">
                                {dayjs(event.end_date!)
                                  .locale('it')
                                  .format('YYYY')}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-orchi-light/80 mb-6">{event.location}</p>

                    <p className="text-orchi-light/70 mb-6 line-clamp-3">
                      {event.description?.replace(/\\n/g, '\n')}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-block tactical-text text-orchi-gold border-b border-orchi-gold group-hover:text-orchi-red group-hover:border-orchi-red transition-colors">
                        DETTAGLI
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="mt-20 p-8 bg-orchi-gray/20 border border-orchi-gray relative">
          <div className="absolute inset-0 bg-tactical-pattern opacity-5"></div>

          <div className="relative z-10">
            <h2 className="tactical-text text-3xl text-center text-orchi-light mb-4">
              SCARICA IL CALENDARIO COMPLETO
            </h2>

            <div className="text-center">
              <PDFDownloadLink
                className="inline-block bg-orchi-red hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
                document={<EventsPDFDocument />}
                fileName={`eventi-2025.pdf`}
              >
                {({ loading }) =>
                  loading
                    ? 'GENERAZIONE CALENDARIO...'
                    : 'SCARICA CALENDARIO 2025'
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventsPage;
