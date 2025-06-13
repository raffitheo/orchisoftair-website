'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Brain, Dumbbell, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { supabase } from '@/lib/supabase';
import TeamMember from '@/types/team-member';

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMembersCount, setTeamMembersCount] = useState(0);
  const [teamMembersKey, setTeamMembersKey] = useState(dayjs().valueOf());

  useEffect(() => {
    countTeamMembers();
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (loading) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento squadra...`;
    else {
      if (teamMembers.length > 0) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | La squadra`;
      else document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessun membro trovato`;
    }
  }, [teamMembers, loading]);

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

  const fetchTeamMembers = async () => {
    try {
      const { data: teamMembersData, error: teamMembersError } = await supabase.from('team_members').select('*');

      if (teamMembersError) throw teamMembersError;

      setTeamMembers(teamMembersData || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il caricamento dei membri della squadra. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoading(false);
      setTeamMembersKey(dayjs().valueOf());
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
              LA SQUADRA
            </h1>

            <p className="text-orchi-light/90 text-xl leading-relaxed">
              Siamo Gli Orchi Trieste, una squadra unita da una passione incrollabile per il softair e forgiata da anni
              di esperienza sul campo. Ogni giocatore è un elemento essenziale del nostro equilibrio tattico, con
              competenze specifiche che contribuiscono alla forza e all’efficacia del gruppo.
              <br />
              Non siamo solo un insieme di ruoli: siamo una squadra vera, coesa, dove la fiducia reciproca e la
              collaborazione sono il cuore di ogni missione. Allenamento dopo allenamento, abbiamo costruito una
              sinergia solida, che ci permette di affrontare ogni sfida con determinazione, lucidità e spirito di
              sacrificio.
              <br />
              Essere un Orco significa dare il massimo, supportare i compagni e crescere insieme, dentro e fuori dal
              campo.
            </p>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            initial="initial"
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">{teamMembersCount}</div>

                <div className="text-orchi-light/80 tactical-text">MEMBRI ATTIVI</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 text-center">
              <CardContent className="p-6"></CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 text-center">
              <CardContent className="p-6">
                <Dumbbell className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">
                  {dayjs().diff(dayjs('01-01-2007'), 'year')}
                </div>

                <div className="text-orchi-light/80 tactical-text">ANNI DI ESPERIENZA</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 text-center">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">100%</div>

                <div className="text-orchi-light/80 tactical-text">DEDIZIONE</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            animate="animate"
            className="mb-16"
            initial="initial"
            key={teamMembersKey}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <h2 className="tactical-text text-4xl text-orchi-gold mb-8 flex items-center">
              <Users className="h-8 w-8 mr-3" />I NOSTRI GUERRIERI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.length === 0 ? (
                loading ? (
                  <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                    <Loader className="m-auto" text="Caricamento in corso..." />
                  </div>
                ) : (
                  <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                    <span className="tactical-text text-2xl text-orchi-light mb-2">
                      Non ci sono membri nella squadra!
                    </span>

                    <span className="text-orchi-light/75">
                      Non ci sono membri nella squadra al momento, ma non temere: siamo costantemente all'opera per
                      creare nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio
                      questa pagina per tutti gli aggiornamenti!
                    </span>
                  </div>
                )
              ) : (
                teamMembers.map((member, index) => (
                  <Card
                    className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500 overflow-hidden"
                    key={member.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                      <motion.div layoutId={`card-image-${member.id}`} className="w-full h-full">
                        <Image
                          alt={member.field_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          height={512}
                          src={member.image_url || '/team-member-placeholder.webp'}
                          width={512}
                        />
                      </motion.div>

                      <div className="absolute inset-0 bg-gradient-to-t from-orchi/80 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="display-text text-3xl md:text-4xl text-white mb-1">{member.name}</h3>

                        <p className="text-orchi-gold text-sm">{member.field_name}</p>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-orchi-light/80">Ruolo:</span>
                          <span className="text-orchi-light text-sm">
                            {member.role === 'president'
                              ? 'Presidente'
                              : member.role === 'vice_president'
                                ? 'Vice Presidente'
                                : member.role === 'advisor'
                                  ? 'Consigliere'
                                  : member.role === 'secretary'
                                    ? 'Segretario'
                                    : member.role === 'member'
                                      ? 'Socio'
                                      : ''}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-orchi-light/80">Membro dal:</span>
                          <span className="text-orchi-gold text-sm font-semibold">{member.year_joined}</span>
                        </div>
                      </div>

                      <Link
                        className="flex flex-col items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                        href={`/team/${member.id}`}
                      >
                        PROFILO COMPLETO
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            animate="animate"
            initial="initial"
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                  <Brain className="h-8 w-8 my-auto" />
                  FILOSOFIA DEGLI ORCHI
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <h3 className="text-xl tactical-text text-orchi-gold mb-4">UNITÀ E STRATEGIA</h3>

                    <p className="text-orchi-light/90 leading-relaxed mb-4">
                      Crediamo che la forza di una squadra risieda nell'unità e nella coordinazione. Ogni membro
                      contribuisce con le proprie competenze uniche per raggiungere obiettivi comuni.
                    </p>

                    <p className="text-orchi-light/90 leading-relaxed">
                      La strategia e la tattica sono fondamentali, ma senza il rispetto reciproco e la fiducia, anche il
                      piano migliore può fallire.
                    </p>
                  </div>

                  <div className="flex flex-col space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <h3 className="text-xl tactical-text text-orchi-gold mb-4">CRESCITA CONTINUA</h3>

                    <p className="text-orchi-light/90 leading-relaxed mb-4">
                      Non smettiamo mai di imparare e migliorare. Ogni battaglia è un'opportunità per crescere, sia
                      individualmente che come squadra.
                    </p>

                    <p className="text-orchi-light/90 leading-relaxed">
                      Accogliamo nuovi membri con entusiasmo e li aiutiamo a sviluppare le loro abilità in un ambiente
                      positivo e stimolante.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
