'use client';

import { useEffect, useState } from 'react';
import Event from '@/types/event';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EventPdfDocument from '@/components/pdf/event-pdf-document';

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (loading)
      document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento evento...`;
    else {
      if (event)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | ${event.title} ${dayjs(event.start_date).locale('it').format('DD MMM YYYY').toUpperCase()}${event.end_date ? ` - ${dayjs(event.end_date).locale('it').format('DD MMM YYYY').toUpperCase()}` : ''}`;
      else
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Evento non trovato`;
    }
  }, [event, loading]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setEvent(data || null);
    } catch (error) {
      console.error('Error fetching the event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-20">
      {!event ? (
        loading ? (
          <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
            <Loader className="m-auto" text="Caricamento in corso..." />
          </div>
        ) : (
          <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
            <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
              Evento non trovato!
            </span>

            <span className="text-center text-orchi-light/70 mx-auto mb-auto">
              L'evento che stai cercando non esiste o non è disponibile al
              momento. Se hai bisogno di assistenza, contatta il nostro team di
              supporto.
            </span>
          </div>
        )
      ) : (
        <>
          <div className="relative h-80 md:h-96 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${event?.image_url || '/tactical-bg.jpg'})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orchi to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-tactical-pattern opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-12">
              <div
                className={`inline-block ${event?.event_type === 'tournament' ? 'bg-orchi-red' : event?.event_type === 'training' ? 'bg-orchi-gold' : 'bg-orchi-gray'} px-3 py-1 mb-4`}
              >
                <span className="text-white text-xs font-bold">
                  {event?.event_type === 'tournament'
                    ? 'TORNEO'
                    : event?.event_type === 'training'
                      ? 'ALLENAMENTO'
                      : 'PARTITA'}
                </span>
              </div>

              <h1 className="display-text text-4xl md:text-6xl text-orchi-light mb-4">
                {event?.title}
              </h1>

              <div className="flex items-center mb-2">
                <Calendar className="text-orchi-red mr-2" size={20} />

                <span className="text-orchi-gold">
                  {dayjs(event?.start_date)
                    .locale('it')
                    .format('DD MMM YYYY')
                    .toUpperCase()}
                </span>

                {event?.end_date && (
                  <>
                    <span className="text-orchi-gold mx-2">-</span>

                    <span className="text-orchi-gold">
                      {dayjs(event?.end_date)
                        .locale('it')
                        .format('DD MMM YYYY')
                        .toUpperCase()}
                    </span>
                  </>
                )}

                <span className="mx-2">•</span>

                <span className="text-orchi-light">{event?.location}</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 mt-8">
            <div className="mb-6">
              <Link
                className="inline-flex items-center tactical-text text-orchi-light hover:text-orchi-gold transition-colors"
                href="/events"
              >
                <ArrowLeft size={16} className="mr-1" />
                TORNA AGLI EVENTI
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-orchi-gray/10 border-orchi-gray p-6 mb-6">
                  <h2 className="tactical-text text-2xl text-orchi-light mb-4">
                    DESCRIZIONE
                  </h2>

                  <p className="text-orchi-light/80 mb-6 whitespace-pre-line">
                    {event?.description?.replace(/\\n/g, '\n')}
                  </p>

                  {event?.rules && (
                    <>
                      <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                        REGOLAMENTO
                      </h3>

                      <ul className="list-disc list-inside space-y-1 pl-4 mb-6 text-orchi-light/80">
                        {event?.rules?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {event?.schedule && (
                    <>
                      <h3 className="tactical-text text-xl text-orchi-gold mb-4">
                        PROGRAMMA
                      </h3>

                      <div className="space-y-3 mb-6">
                        {event?.schedule?.map((item, index) => (
                          <div
                            key={index}
                            className="flex border-b border-orchi-gray pb-2"
                          >
                            <div className="w-24 font-bold text-orchi-red">
                              {item.time}
                            </div>

                            <div className="flex-grow text-orchi-light">
                              {item.activity}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {event?.equipment && (
                    <>
                      <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                        EQUIPAGGIAMENTO RICHIESTO
                      </h3>

                      <ul className="list-disc list-inside space-y-1 pl-4 mb-6 text-orchi-light/80">
                        {event?.equipment?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </Card>
              </div>

              <div>
                <Card className="bg-orchi-gray/10 border-orchi-gray p-6 mb-6 sticky top-24">
                  <h3 className="tactical-text text-xl text-orchi-light mb-4">
                    INFORMAZIONI
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-orchi-light/60 text-sm">Data</div>

                      <div className="flex">
                        <div className="text-orchi-gold">
                          {dayjs(event?.start_date)
                            .locale('it')
                            .format('DD MMM YYYY')
                            .toUpperCase()}
                        </div>

                        {event?.end_date && (
                          <>
                            <span className="text-orchi-gold mx-2">-</span>

                            <span className="text-orchi-gold">
                              {dayjs(event?.end_date)
                                .locale('it')
                                .format('DD MMM YYYY')
                                .toUpperCase()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-orchi-light/60 text-sm">
                        Location
                      </div>

                      <div className="text-orchi-light">{event?.location}</div>
                    </div>

                    <div>
                      <div className="text-orchi-light/60 text-sm">Tipo</div>

                      <div className="text-orchi-light">
                        {event?.event_type === 'tournament'
                          ? 'TORNEO'
                          : event?.event_type === 'training'
                            ? 'ALLENAMENTO'
                            : 'PARTITA'}
                      </div>
                    </div>

                    <div className="pt-4">
                      {event?.registration_open ? (
                        <Link
                          className="block w-full text-center bg-orchi-red hover:bg-orchi-gold text-white tactical-text py-2 px-4"
                          href="#"
                        >
                          REGISTRATI
                        </Link>
                      ) : (
                        <Button
                          className="w-full bg-orchi-gray/50 text-orchi-light/50 tactical-text py-3 cursor-not-allowed"
                          disabled
                        >
                          ISCRIZIONI CHIUSE
                        </Button>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        className="block w-full text-center tactical-text text-orchi-gold border border-orchi-gold hover:bg-orchi-gold/10 transition-colors py-2 px-4"
                        href="/join-us"
                      >
                        CONTATTACI
                      </Link>
                    </div>

                    <div className="pt-2">
                      <PDFDownloadLink
                        className="block w-full text-center tactical-text text-orchi-gold border border-orchi-gold hover:bg-orchi-gold/10 transition-colors py-2 px-4"
                        document={<EventPdfDocument event={event} />}
                        fileName={`${event.title.toLowerCase().replace(/ /g, '-')}_${dayjs(event.start_date).locale('it').format('DD MMM YYYY').replace(/ /g, '-')}${event.end_date ? `_${dayjs(event.end_date).locale('it').format('DD MMM YYYY').replace(/ /g, '-')}` : ''}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? 'GENERAZIONE PDF...' : 'SCARICA PDF'
                        }
                      </PDFDownloadLink>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default EventDetailPage;
