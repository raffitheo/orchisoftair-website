'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';
import Loader from './ui/loader';
import Event from '@/types/event';
import { Card, CardContent, CardHeader } from './ui/card';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-orchi" id="eventi">
      <div className="container mx-auto px-4">
        <h2 className="display-text text-4xl md:text-5xl text-orchi-light mb-4 text-center">
          PROSSIMI <span className="text-orchi-red">EVENTI</span>
        </h2>

        <p className="text-orchi-light/70 mb-12">
          Unisciti a noi nei prossimi eventi! Che si tratti di tornei
          competitivi o sessioni di allenamento, ogni occasione è perfetta per
          mettersi alla prova, imparare e vivere la vera adrenalina del softair.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                  Non ci sono eventi in programma!
                </span>

                <span className="text-orchi-light/70 mx-auto mb-auto">
                  Non ci sono eventi in calendario al momento, ma non temere:
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

        <div className="text-center mt-12">
          <Button
            asChild
            className="inline-block bg-orchi-gray hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
          >
            <Link href="/events">TUTTI GLI EVENTI</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
