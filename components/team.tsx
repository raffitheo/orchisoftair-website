'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase';
import TeamMember, { TeamMemberSchema } from '@/types/team-member';

import { Card, CardContent } from './ui/card';
import Loader from './ui/loader';

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data: teamMembers, error } = await supabase.rpc('get_random_team_members', {
        limit_count: 8,
      });

      if (error) throw error;

      if (teamMembers) {
        const validatedTeamMember = TeamMemberSchema.array().parse(teamMembers);

        setTeamMembers(validatedTeamMember);
      } else setTeamMembers([]);
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
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-orchi relative overflow-hidden" id="the-team">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          animate="animate"
          className="my-auto"
          initial="initial"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <h2 className="display-text text-5xl md:text-6xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
            LA SQUADRA
          </h2>

          <p className="text-orchi-light/90 mb-10 text-lg leading-relaxed">
            Gli Orchi sono più di un team: siamo una vera unità. Ogni membro è fondamentale, ogni ruolo conta. Con
            passione, disciplina e spirito di squadra affrontiamo ogni sfida insieme.
          </p>
        </motion.div>

        <motion.div
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          {teamMembers.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4">
                <span className="tactical-text text-2xl text-orchi-light mb-2">Non ci sono membri nella squadra!</span>

                <span className="text-orchi-light/75">
                  Non ci sono membri nella squadra al momento, ma non temere: siamo costantemente all'opera per creare
                  nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio questa pagina
                  per tutti gli aggiornamenti!
                </span>
              </div>
            )
          ) : (
            teamMembers.map((member) => (
              <Card
                className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 overflow-hidden"
                key={member.id}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <motion.div layoutId={`card-image-${member.id}`} className="w-full h-full">
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

        <div className="flex items-center justify-center mt-12">
          <Link
            className="flex flex-col items-center justify-center h-auto w-auto rounded-lg bg-transparent border-2 border-orchi-gray/50 text-orchi-light tactical-text transform hover:scale-105 hover:bg-orchi-gray/20 hover:text-orchi-gold hover:border-orchi-gold/60 py-4 px-8 transition-all duration-300"
            href="/team"
          >
            SCOPRI LA SQUADRA
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
