'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ArrowLeft, Building, Calendar, Clock, LogIn, MapPin, NotepadText, Target, Trophy, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import 'dayjs/locale/it';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Event, { EventSchema } from '@/types/event';

const EventDetailPage = () => {
  const { loadingAuth, profile } = useAuth();
  const params = useParams();

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingOperation, setLoadingOperation] = useState(false);

  const id = params.id;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (loading) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento evento...`;
    else {
      if (currentEvent)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | ${currentEvent.title} ${dayjs(currentEvent.start_date).locale('it').format('DD MMM YYYY').toUpperCase()}${currentEvent.end_date ? ` - ${dayjs(currentEvent.end_date).locale('it').format('DD MMM YYYY').toUpperCase()}` : ''}`;
      else document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Evento non trovato`;
    }
  }, [currentEvent, loading]);

  const fetchEvent = async () => {
    try {
      const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', parseInt(id!.toString()))
        .single();

      if (error) throw error;

      if (event) {
        const validatedEvent = EventSchema.parse(event);

        setCurrentEvent(validatedEvent);
      } else setCurrentEvent(null);
    } catch (error) {
      console.error('Error fetching the currentEvent:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il caricamento dell'evento. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const eventUpdateUserPresance = async (subscribe: boolean) => {
    if (!profile || loadingAuth || !currentEvent) return;

    setLoadingOperation(true);

    try {
      let participantsList = [...currentEvent.participants];

      if (subscribe) {
        participantsList.push({
          type: 'registered-user',
          value: profile.id || '',
        });
      } else {
        participantsList = participantsList.filter((partecipant) => partecipant.value !== profile.id);
      }

      const { data: event, error } = await supabase
        .from('events')
        .update({
          participants: participantsList as any,
        })
        .eq('id', parseInt(id!.toString()))
        .select()
        .single();

      if (error) throw error;

      toast.success("Aggiornamento della presenza all'evento avvenuto con successso!");

      if (event) {
        const validatedEvent = EventSchema.parse(event);

        setCurrentEvent(validatedEvent);
      } else setCurrentEvent(null);
    } catch (error) {
      console.error("Error updating the user's presence at the currentEvent", error);
      toast.error(
        `Si è verificato un errore imprevisto durante l'aggiornamento della presenza all'evento. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoadingOperation(false);
    }
  };

  const getEventLength = () => {
    let length = 0;

    const beginDate = dayjs(
      `${dayjs(currentEvent!.start_date).format('YYYY-MM-DD')}T${currentEvent!.schedule[0].time}`
    );
    const endDate = dayjs(
      `${dayjs(currentEvent!.end_date || currentEvent!.start_date).format('YYYY-MM-DD')}T${currentEvent!.schedule[currentEvent!.schedule.length - 1].time}`
    );

    length = endDate.diff(beginDate, 'hour');

    return `${length}h`;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const isUserRegistered = currentEvent?.participants?.some(
    (participant) => participant.type === 'registered-user' && participant.value === profile?.id
  );

  const isEventFull = currentEvent?.maximum_participants
    ? currentEvent.participants.length >= currentEvent.maximum_participants
    : false;

  const isDisabled: boolean =
    !profile || loadingAuth || !currentEvent?.registration_open || isUserRegistered || isEventFull;

  return (
    <div className="min-h-screen bg-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            animate="animate"
            className="mb-6 w-full justify-between flex items-center"
            initial="initial"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Link
              className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
              href={`/events`}
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              TORNA AGLI EVENTI
            </Link>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="initial"
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            {!currentEvent ? (
              loading ? (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <Loader className="m-auto" text="Caricamento in corso..." />
                </div>
              ) : (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <span className="tactical-text text-2xl text-orchi-light mb-2">Evento non trovato!</span>

                  <span className="text-orchi-light/75">
                    L'evento che stai cercando non esiste o non è disponibile al momento. Se hai bisogno di assistenza,
                    contatta il nostro team di supporto.
                  </span>
                </div>
              )
            ) : (
              <>
                <div className="lg:col-span-2 flex flex-col space-y-8">
                  <Card className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <div className="relative overflow-hidden rounded-xl">
                      <motion.div className="aspect-video w-full h-auto" layoutId={`card-image-${currentEvent.id}`}>
                        <Image
                          alt={currentEvent.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                          fill
                          src={currentEvent.image_url || '/event-placeholder.webp'}
                          quality={100}
                        />
                      </motion.div>

                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-orchi via-orchi/40 to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h1 className="display-text text-4xl md:text-5xl text-white mb-4">{currentEvent.title}</h1>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center text-orchi-light/90">
                            <Calendar className="h-4 w-4 mr-2 text-orchi-gold" />
                            {dayjs(currentEvent.start_date).locale('it').format('DD MMM YYYY').toUpperCase()}
                            {currentEvent.end_date
                              ? ` - ${dayjs(currentEvent.end_date).locale('it').format('DD MMM YYYY').toUpperCase()}`
                              : ''}
                          </div>

                          <div className="flex items-center text-orchi-light/90">
                            <Clock className="h-4 w-4 mr-2 text-orchi-gold" />
                            {currentEvent.schedule[0].time} -{' '}
                            {currentEvent.schedule[currentEvent.schedule.length - 1].time}
                          </div>

                          <div className="flex items-center text-orchi-light/90">
                            <MapPin className="h-4 w-4 mr-2 text-orchi-gold" />
                            {currentEvent.location}
                          </div>

                          <div className="flex items-center text-orchi-light/90">
                            <Trophy className="h-4 w-4 mr-2 text-orchi-gold" />
                            {currentEvent.event_type === 'tournament'
                              ? 'Torneo'
                              : currentEvent.event_type === 'training'
                                ? 'Allenamento'
                                : 'Partita'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <motion.div
                    animate="animate"
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial="initial"
                    transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-orchi-gold">{currentEvent.participants.length}</div>

                        <div className="tactical-text text-orchi-light/60 text-sm">ISCRITTI</div>
                      </CardContent>
                    </Card>

                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-orchi-gold">
                          {currentEvent.maximum_participants || 'ILLIMITATI'}
                        </div>

                        <div className="tactical-text text-orchi-light/60 text-sm">POSTI</div>
                      </CardContent>
                    </Card>

                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-orchi-gold">{getEventLength()}</div>

                        <div className="tactical-text text-orchi-light/60 text-sm">DURATA</div>
                      </CardContent>
                    </Card>

                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-orchi-gold">
                          {currentEvent.price ? `€${currentEvent.price}` : 'NESSUNA'}
                        </div>

                        <div className="tactical-text text-orchi-light/60 text-sm">QUOTA</div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <NotepadText className="h-8 w-8" />
                          DESCRIZIONE EVENTO
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <p className="text-orchi-light/90 leading-relaxed whitespace-pre-line">
                          {(currentEvent.description || 'Nessuna descrizione disponibile.').replace(/\\n/g, '\n')}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Target className="h-8 w-8" />
                          EQUIPAGGIAMENTO RICHIESTO
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <ul className="flex flex-col space-y-6">
                          {currentEvent.equipment.map((equipment, index) => (
                            <li
                              className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                              key={index}
                            >
                              <div className="bg-orchi-red w-2 h-2 rounded-full" />

                              <span className="text-orchi-light text-lg">{equipment}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  animate="animate"
                  className="flex flex-col space-y-6"
                  initial="initial"
                  transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
                  variants={fadeInUp}
                >
                  <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                        <LogIn className="h-8 w-8" />
                        REGISTRAZIONE
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col space-y-4">
                      <Button
                        className="w-full"
                        disabled={isDisabled}
                        onClick={() => eventUpdateUserPresance(true)}
                        tabIndex={isDisabled ? -1 : undefined}
                      >
                        ISCRIVITI ALL'EVENTO
                      </Button>

                      <p className="text-orchi-light/70 text-sm text-center">
                        {!profile || loadingAuth
                          ? "Per iscriverti in autonomia all'envento devi essere un membro degli Orchi. Se sei un ospite o un esterno e vuoi partecipare, per favore contattaci direttamente."
                          : currentEvent?.participants
                                .filter((participant) => participant.type === 'registered-user')
                                .find((participant) => participant.value === profile.id)
                            ? 'Stai già partecipando a questo evento.'
                            : !currentEvent.registration_open
                              ? 'Le registrazioni sono al momento chiuse.'
                              : (
                                    currentEvent.maximum_participants
                                      ? currentEvent.participants.length >= currentEvent.maximum_participants
                                      : false
                                  )
                                ? 'È stato raggiunto il numero massimo di partecipanti, le iscrizioni sono chiuse.'
                                : "Le registrazioni si chiudono automaticamente all'inizio dell'evento."}
                      </p>

                      {!profile || loadingAuth ? (
                        <Link
                          className="flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                          href={`/contact-us`}
                        >
                          SCRIVICI ORA
                        </Link>
                      ) : (
                        currentEvent?.participants
                          .filter((participant) => participant && participant.type === 'registered-user')
                          .find((participant) => participant && participant.value === profile.id) && (
                          <Button className="w-full" onClick={() => eventUpdateUserPresance(false)}>
                            DISISCRIVITI DALL'EVENTO
                          </Button>
                        )
                      )}
                    </CardContent>
                  </Card>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Clock className="h-8 w-8" />
                          PROGRAMMA DELLA GIORNATA
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <ul className="flex flex-col space-y-6">
                          {currentEvent.schedule.map((item, index) => (
                            <li
                              className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                              key={index}
                            >
                              <div className="tactical-text text-orchi-red text-md mt-auto flex-shrink-0">
                                {item.time}
                              </div>

                              <div className="text-orchi-light text-lg ml-4">{item.activity}</div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Building className="h-8 w-8" />
                          ORGANIZZAZIONE
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <ul className="flex flex-col space-y-6">
                          {currentEvent.organization?.map((organizer, index) => (
                            <li
                              className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                              key={index}
                            >
                              <User className="h-8 w-8 text-orchi-red" />

                              <div className="flex flex-col lg:flex-row space-between w-full">
                                <div className="flex-1">
                                  <p className="text-orchi-light font-semibold">{organizer.name}</p>

                                  {organizer.contacts.email && (
                                    <p className="text-orchi-light/80">Email: {organizer.contacts.email}</p>
                                  )}

                                  {organizer.contacts.phone && (
                                    <p className="text-orchi-light/80">Telefono: {organizer.contacts.phone}</p>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
