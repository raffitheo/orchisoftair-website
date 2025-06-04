'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Loader from './ui/loader';
import TeamMember from '@/types/team-member';
import { Card, CardContent } from './ui/card';

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data: randomTeamMembersData, error: randomTeamMembersError } =
        await supabase.rpc('get_random_team_members', {
          limit_count: 6,
        });

      if (randomTeamMembersError) throw randomTeamMembersError;

      setTeamMembers(randomTeamMembersData || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-orchi" id="the-team">
      <div className="container mx-auto px-4">
        <h2 className="display-text text-4xl md:text-5xl text-orchi-light mb-4 text-center">
          LA <span className="text-orchi-red">SQUADRA</span>
        </h2>

        <p className="text-orchi-light/70 mb-12">
          Gli Orchi sono più di un team: siamo una vera unità. Ogni membro è
          fondamentale, ogni ruolo conta. Con passione, disciplina e spirito di
          squadra affrontiamo ogni sfida insieme.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                  Non ci sono membri nella squadra!
                </span>

                <span className="text-orchi-light/70 mx-auto mb-auto">
                  Non ci sono membri nella squadra al momento, ma non temere:
                  siamo costantemente all'opera per creare nuove ed
                  entusiasmanti attività e contenuti esclusivi per i nostri
                  soci! Tieni d'occhio questa pagina per tutti gli
                  aggiornamenti!
                </span>
              </div>
            )
          ) : (
            teamMembers.map((member) => (
              <Link
                className="block h-full"
                href={`/team/${member.id}`}
                key={member.id}
              >
                <Card className="overflow-hidden bg-orchi-gray/10 border border-orchi-gray hover:border-orchi-gold transition-all group h-full">
                  <div className="aspect-square overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${member.image_url || '/team-member-placeholder.webp'})`,
                      }}
                    />
                  </div>

                  <CardContent className="p-6">
                    <h2 className="tactical-text text-3xl text-orchi-light mb-1">
                      {member.name}
                    </h2>

                    <p className="text-orchi-red font-semibold mb-2">
                      {member.field_name}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="text-orchi-light/80 text-sm mr-2">
                        Ruolo:
                      </span>

                      <span className="text-orchi-gold">
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
                      <span className="ml-auto inline-block tactical-text text-orchi-gold border-b border-orchi-gold group-hover:text-orchi-red group-hover:border-orchi-red transition-colors">
                        PROFILO COMPLETO
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            className="inline-block bg-orchi-gray hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
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
