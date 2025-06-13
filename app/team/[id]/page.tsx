'use client';

import { useEffect, useRef, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUp,
  Book,
  Calendar,
  CircleEllipsis,
  Contact,
  Facebook,
  Info,
  Instagram,
  Luggage,
  MapPin,
  Star,
  Tally1,
  Tally2,
  Trophy,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import TeamMember from '@/types/team-member';

const TeamMemberDetailPage = () => {
  const params = useParams();

  const [imageHoverHeight, setImageHoverHeight] = useState(0);
  const [loadingTeamMember, setLoadingTeamMember] = useState(true);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(true);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const imageHoverRef = useRef<HTMLDivElement>(null);

  const id = params.id;

  useEffect(() => {
    fetchTeamMember();
    fetchTeamMembers();
  }, [id]);

  useEffect(() => {
    if (loadingTeamMember)
      document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento membro della squadra...`;
    else {
      if (teamMember)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | ${teamMember.name} - ${teamMember.field_name}`;
      else document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Membro della squadra non trovato`;
    }
  }, [loadingTeamMember, teamMember]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (imageHoverRef.current) setImageHoverHeight(imageHoverRef.current.clientHeight);
      }, 100);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [loadingTeamMember, teamMember]);

  const fetchTeamMember = async () => {
    try {
      const { data: teamMembersData, error: teamMembersError } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id)
        .single();

      if (teamMembersError) throw teamMembersError;
      setTeamMember(teamMembersData || null);
    } catch (error) {
      console.error('Error fetching the team member:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il caricamento del membro della squadra. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoadingTeamMember(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const { data: randomTeamMemberData, error: randomTeamMemberError } = await supabase.rpc(
        'get_random_team_members',
        {
          limit_count: 4,
          user_id: id,
        }
      );

      if (randomTeamMemberError) throw randomTeamMemberError;

      setTeamMembers(randomTeamMemberData || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoadingTeamMembers(false);
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
            className="mb-6 w-full justify-between flex items-center"
            initial="initial"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Link
              className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
              href={`/team`}
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              TORNA ALLA SQUADRA
            </Link>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="initial"
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            {!teamMember ? (
              loadingTeamMember ? (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <Loader className="m-auto" text="Caricamento in corso..." />
                </div>
              ) : (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <span className="tactical-text text-2xl text-orchi-light mb-2">
                    Membro della squadra non trovato!
                  </span>

                  <span className="text-orchi-light/75">
                    Il mombro della squadra che stai cercando non esiste o non è disponibile al momento. Se hai bisogno
                    di assistenza, contatta il nostro team di supporto.
                  </span>
                </div>
              )
            ) : (
              <>
                <div className="lg:col-span-2 flex flex-col space-y-8">
                  <Card className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <motion.div className="w-full h-full" layoutId={`card-image-${teamMember.id}`}>
                        <Image
                          alt={teamMember.field_name}
                          className="object-cover w-full h-full"
                          fill
                          src={teamMember.image_url || '/team-member-placeholder.webp'}
                          quality={100}
                        />
                      </motion.div>

                      <div
                        className={`absolute inset-0 z-10 bg-gradient-to-t from-orchi/80 via-transparent to-transparent lg:group-hover:translate-y-[var(--animated-translate-y)] transform transition-transform duration-300`}
                        style={
                          {
                            '--animated-translate-y': `-${imageHoverHeight - 112}px`,
                          } as React.CSSProperties
                        }
                      />

                      <div
                        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end transform transition-transform duration-300 translate-y-[calc(100%-112px)] lg:group-hover:translate-y-0"
                        ref={imageHoverRef}
                      >
                        <div className="flex h-28 flex-col justify-end">
                          <div className="px-6 pb-6 flex flex-row w-full justify-between">
                            <div className="flex flex-col">
                              <h1 className="display-text text-4xl md:text-5xl text-white mb-2">{teamMember.name}</h1>

                              <div className="flex items-center text-orchi-gold">{teamMember.field_name}</div>
                            </div>

                            <motion.div
                              animate={{
                                y: [0, 10, 0],
                              }}
                              className="opacity-100 z-20 group-hover:opacity-0 transition-opacity duration-300 hidden lg:block"
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <ArrowUp
                                  className="text-orchi-light/90 hover:text-orchi-gold transition-colors duration-300"
                                  size={30}
                                />
                                <span className="tactical-text text-xs text-orchi-light/90">BIOGRAFIA</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        <div className="bg-orchi/80 p-6 pt-0">
                          <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                            <CardHeader>
                              <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                                <Book className="h-8 w-8" />
                                BIOGRAFIA
                              </CardTitle>
                            </CardHeader>

                            <CardContent>
                              <p className="text-orchi-light/90 leading-relaxed whitespace-pre-line overflow-y-auto max-h-50">
                                {teamMember?.bio?.replace(/\\n/g, '\n') || 'Nessuna biografia disponibile.'}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 lg:hidden">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Book className="h-8 w-8" />
                          BIOGRAFIA
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <p className="text-orchi-light/90 leading-relaxed whitespace-pre-line overflow-y-auto max-h-50">
                          {teamMember?.bio?.replace(/\\n/g, '\n') || 'Nessuna biografia disponibile.'}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Luggage className="h-8 w-8" />
                          EQUIPAGGIAMENTO
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-col space-y-6">
                          <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                            <Tally1 className="h-8 w-8 text-orchi-red" />

                            <div className="flex flex-col lg:flex-row space-between w-full">
                              <div className="flex-1">
                                <p className="text-orchi-light font-semibold">Replica primaria</p>

                                <p className="text-orchi-light/80">{teamMember?.equipment.primary || 'Nessuna'}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                            <Tally2 className="h-8 w-8 text-orchi-red" />

                            <div className="flex flex-col lg:flex-row space-between w-full">
                              <div className="flex-1">
                                <p className="text-orchi-light font-semibold">Replica secondaria</p>

                                <p className="text-orchi-light/80">{teamMember?.equipment.secondary || 'Nessuna'}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                            <CircleEllipsis className="h-8 w-8 text-orchi-red" />

                            <div className="flex flex-col lg:flex-row space-between w-full">
                              <div className="flex-1">
                                <p className="text-orchi-light font-semibold">Altro</p>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
                                  {teamMember.equipment?.other?.map((other, index) => (
                                    <li className="flex items-center space-x-4 p-0 border-0" key={index}>
                                      <div className="bg-orchi-red w-2 h-2 rounded-full" />

                                      <span className="text-orchi-light text-lg">{other.value}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  animate="animate"
                  className="flex flex-col space-y-6"
                  initial="initial"
                  transition={{ duration: 0.5, delay: 0.8, ease: 'easeInOut' }}
                  variants={fadeInUp}
                >
                  <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                        <Info className="h-8 w-8" />
                        INFORMAZIONI
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col space-y-6">
                        <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                          <Star className="h-8 w-8 text-orchi-red" />

                          <div className="flex flex-col lg:flex-row space-between w-full">
                            <div className="flex-1">
                              <p className="text-orchi-light font-semibold">Ruolo</p>

                              <p className="text-orchi-light/80">
                                {teamMember.role === 'president'
                                  ? 'Presidente'
                                  : teamMember.role === 'vice_president'
                                    ? 'Vice Presidente'
                                    : teamMember.role === 'advisor'
                                      ? 'Consigliere'
                                      : teamMember.role === 'secretary'
                                        ? 'Segretario'
                                        : teamMember.role === 'member'
                                          ? 'Socio'
                                          : ''}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                          <MapPin className="h-8 w-8 text-orchi-red" />

                          <div className="flex flex-col lg:flex-row space-between w-full">
                            <div className="flex-1">
                              <p className="text-orchi-light font-semibold">Posizione</p>

                              <p className="text-orchi-light/80">{teamMember.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                          <Calendar className="h-8 w-8 text-orchi-red" />

                          <div className="flex flex-col lg:flex-row space-between w-full">
                            <div className="flex-1">
                              <p className="text-orchi-light font-semibold">Membro dal</p>

                              <p className="text-orchi-light/80">{teamMember.year_joined}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Trophy className="h-8 w-8" />
                          ACHIVEMENTS
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <ul className="flex flex-col space-y-6">
                          {teamMember.achivements?.map((achivement, index) => (
                            <li
                              className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                              key={index}
                            >
                              <div className="bg-orchi-red w-2 h-2 rounded-full" />

                              <span className="text-orchi-light text-lg">{achivement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate="animate"
                    initial="initial"
                    transition={{ duration: 0.5, delay: 1.2, ease: 'easeInOut' }}
                    variants={fadeInUp}
                  >
                    <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                          <Contact className="h-8 w-8" />
                          SOCIAL
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex flex-col space-y-3">
                        {teamMember?.socials.facebook && (
                          <Link
                            className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                            href={`https://facebook.com/${teamMember.socials.facebook}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Facebook className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            FACEBOOK
                          </Link>
                        )}

                        {teamMember?.socials.instagram && (
                          <Link
                            className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                            href={`https://instagram.com/${teamMember.socials.instagram}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Instagram className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            INSTAGRAM
                          </Link>
                        )}

                        {teamMember?.socials.twitter && (
                          <Link
                            className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                            href={`https://twitter.com/${teamMember.socials.twitter}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Twitter className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            TWITTER/X
                          </Link>
                        )}

                        {teamMember?.socials.youtube && (
                          <Link
                            className="group flex flex-row items-center justify-center h-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
                            href={`https://youtube.com/${teamMember.socials.youtube}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Youtube className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            YOUTUBE
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>

          <div className="mt-12">
            <Separator className="mb-8 bg-orchi-gray/30" />

            <motion.div
              animate="animate"
              initial="initial"
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <h4 className="display-text text-3xl md:text-6xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
                ALTRI MEMBRI
              </h4>
            </motion.div>

            <motion.div
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="initial"
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              {teamMembers.length === 0 ? (
                loadingTeamMembers ? (
                  <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                    <Loader className="m-auto" text="Caricamento in corso..." />
                  </div>
                ) : (
                  <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                    <span className="tactical-text text-2xl text-orchi-light mb-2">
                      Non ci sono altri membri nella squadra!
                    </span>

                    <span className="text-orchi-light/75">
                      Non ci sono altri membri nella squadra al momento, ma non temere: siamo costantemente all'opera
                      per creare nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio
                      questa pagina per tutti gli aggiornamenti!
                    </span>
                  </div>
                )
              ) : (
                teamMembers.map((member) => (
                  <Card
                    className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 overflow-hidden"
                    key={member.id}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <motion.div className="w-full h-full" layoutId={`card-image-${member.id}`}>
                        <Image
                          alt={member.field_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <div className="flex flex-col space-y-3 mb-4">
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
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamMemberDetailPage;
