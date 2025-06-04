'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import TeamMember from '@/types/team-member';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/ui/loader';

const TeamMemberDetailPage = () => {
  const params = useParams();

  const [loadingTeamMember, setLoadingTeamMember] = useState(true);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(true);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

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
      else
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Membro della squadra non trovato`;
    }
  }, [loadingTeamMember, teamMember]);

  const fetchTeamMember = async () => {
    try {
      const { data: teamMembersData, error: teamMembersError } = await supabase
        .from('team_members')
        .select('*, team_member_socials(*), team_member_equipment(*)')
        .eq('id', id)
        .single();

      if (teamMembersError) throw teamMembersError;
      setTeamMember(teamMembersData || null);
    } catch (error) {
      console.error('Error fetching the team member:', error);
    } finally {
      setLoadingTeamMember(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const { data: randomTeamMemberData, error: randomTeamMemberError } =
        await supabase.rpc('get_random_team_members', {
          limit_count: 5,
          user_id: id,
        });

      if (randomTeamMemberError) throw randomTeamMemberError;

      setTeamMembers(randomTeamMemberData || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoadingTeamMembers(false);
    }
  };

  return (
    <main className="pt-24 pb-28">
      <div className="container mx-auto px-4 mt-8">
        <div className="mb-6">
          <Link
            className="inline-flex items-center tactical-text text-orchi-light hover:text-orchi-gold transition-colors"
            href="/team"
          >
            <ArrowLeft size={16} className="mr-1" />
            TORNA ALLA SQUADRA
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {!teamMember ? (
            loadingTeamMember ? (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                  Membro della squadra non trovato!
                </span>

                <span className="text-center text-orchi-light/70 mx-auto mb-auto">
                  Il mombro della squadra che stai cercando non esiste o non è
                  disponibile al momento. Se hai bisogno di assistenza, contatta
                  il nostro team di supporto.
                </span>
              </div>
            )
          ) : (
            <>
              <div>
                <Card className="overflow-hidden bg-orchi-gray/10 border border-orchi-gray mb-6 sticky top-24">
                  <div className="aspect-square overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${teamMember?.image_url || '/team-member-placeholder.webp'})`,
                      }}
                    />
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <User size={20} className="text-orchi-red mr-2" />

                      <h2 className="tactical-text text-3xl text-orchi-light">
                        {teamMember?.name}
                      </h2>
                    </div>

                    <p className="text-orchi-red font-semibold mb-4">
                      {teamMember?.field_name}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="text-orchi-light/80 text-sm mr-2">
                        Ruolo:
                      </span>

                      <span className="text-orchi-gold">
                        {teamMember?.role === 'president'
                          ? 'Presidente'
                          : teamMember?.role === 'vice_president'
                            ? 'Vice Presidente'
                            : teamMember?.role === 'advisor'
                              ? 'Consigliere'
                              : teamMember?.role === 'secretary'
                                ? 'Segretario'
                                : teamMember?.role === 'member'
                                  ? 'Socio'
                                  : ''}
                      </span>
                    </div>

                    <div className="text-orchi-light/60 text-sm mb-1">
                      Membro dal
                    </div>

                    <div className="text-orchi-light mb-6">
                      {teamMember?.year_joined}
                    </div>

                    <div className="pt-2">
                      <p className="text-orchi-light/60 text-sm mb-2">Social</p>

                      <div className="flex gap-4">
                        {teamMember?.team_member_socials.instagram && (
                          <a
                            className="text-orchi-light/80 hover:text-orchi-gold transition-colors"
                            href={`https://instagram.com/${teamMember?.team_member_socials.instagram}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Instagram
                          </a>
                        )}

                        {teamMember?.team_member_socials.facebook && (
                          <a
                            className="text-orchi-light/80 hover:text-orchi-gold transition-colors"
                            href={`https://facebook.com/${teamMember?.team_member_socials.facebook}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Facebook
                          </a>
                        )}

                        {teamMember?.team_member_socials.twitter && (
                          <a
                            className="text-orchi-light/80 hover:text-orchi-gold transition-colors"
                            href={`https://twitter.com/${teamMember?.team_member_socials.twitter}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Twitter/X
                          </a>
                        )}

                        {teamMember?.team_member_socials.youtube && (
                          <a
                            className="text-orchi-light/80 hover:text-orchi-gold transition-colors"
                            href={`https://youtube.com/${teamMember?.team_member_socials.youtube}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="bg-orchi-gray/10 border border-orchi-gray p-6 mb-6">
                  <h2 className="tactical-text text-2xl text-orchi-light mb-4">
                    BIOGRAFIA
                  </h2>

                  <p className="text-orchi-light/80 mb-8 whitespace-pre-line">
                    {teamMember?.bio?.replace(/\\n/g, '\n') ||
                      'Nessuna descrizione disponibile.'}
                  </p>

                  <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                    ACHIEVEMENTS
                  </h3>

                  <div className="space-y-4">
                    {teamMember?.achivements &&
                    teamMember?.achivements.length >= 1 ? (
                      <ul
                        className={`list-disc list-inside space-y-1 pl-4 ${editing ? '' : 'mb-8'} text-orchi-light/80`}
                      >
                        {teamMember?.achivements?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-8 text-orchi-light/80">
                        Non ci soono achivements.
                      </p>
                    )}
                  </div>

                  <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                    EQUIPAGGIAMENTO
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-orchi-light/60 text-sm">
                        Replica Primaria
                      </div>

                      <div className="text-orchi-light">
                        {teamMember?.team_member_equipment.primary || 'Nessuna'}
                      </div>
                    </div>

                    <div>
                      <div className="text-orchi-light/60 text-sm">
                        Replica Secondaria
                      </div>

                      <div className="text-orchi-light">
                        {teamMember?.team_member_equipment.secondary ||
                          'Nessuna'}
                      </div>
                    </div>

                    <div>
                      <div className="text-orchi-light/60 text-sm mb-1">
                        Altro
                      </div>

                      {teamMember?.team_member_equipment.other &&
                      teamMember?.team_member_equipment.other.length >= 1 ? (
                        <ul className="list-disc list-inside space-y-1 pl-4 text-orchi-light/80">
                          {teamMember?.team_member_equipment.other?.map(
                            (item, index) => <li key={index}>{item}</li>,
                          )}
                        </ul>
                      ) : (
                        <p className="text-orchi-light/80">
                          Non ci soono altri equipaggiamenti.
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>

        <div className="mt-12">
          <Separator className="mb-8 bg-orchi-gray/30" />

          <h3 className="tactical-text text-2xl text-orchi-light mb-6 text-center">
            ALTRI MEMBRI
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {teamMembers.length === 0 ? (
              loadingTeamMembers ? (
                <div className="flex flex-col col-span-2 md:col-span-3 md:col-span-5 h-[17.25rem]">
                  <Loader className="m-auto" text="Caricamento in corso..." />
                </div>
              ) : (
                <div className="flex flex-col col-span-2 md:col-span-3 md:col-span-5 h-[17.25rem]">
                  <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                    Non ci sono altri membri nella squadra!
                  </span>

                  <span className="text-orchi-light/70 mx-auto mb-auto">
                    Non ci sono altri membri nella squadra al momento, ma non
                    temere: siamo costantemente all'opera per creare nuove ed
                    entusiasmanti attività e contenuti esclusivi per i nostri
                    soci! Tieni d'occhio questa pagina per tutti gli
                    aggiornamenti!
                  </span>
                </div>
              )
            ) : (
              teamMembers.map((otherMember) => (
                <Link
                  className="block h-full"
                  href={`/team/${otherMember.id}`}
                  key={otherMember.id}
                >
                  <Card className="overflow-hidden bg-orchi-gray/10 border border-orchi-gray hover:border-orchi-gold transition-all group h-full">
                    <div className="aspect-square overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${otherMember.image_url || '/team-member-placeholder.webp'})`,
                        }}
                      />
                    </div>

                    <CardContent className="p-6">
                      <h2 className="tactical-text text-3xl text-orchi-light mb-1">
                        {otherMember.name}
                      </h2>

                      <p className="text-orchi-red font-semibold mb-2">
                        {otherMember.field_name}
                      </p>

                      <div className="flex items-center mb-4">
                        <span className="text-orchi-light/80 text-sm mr-2">
                          Ruolo:
                        </span>

                        <span className="text-orchi-gold">
                          {otherMember.role === 'president'
                            ? 'Presidente'
                            : otherMember.role === 'vice_president'
                              ? 'Vice Presidente'
                              : otherMember.role === 'advisor'
                                ? 'Consigliere'
                                : otherMember.role === 'secretary'
                                  ? 'Segretario'
                                  : otherMember.role === 'member'
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
        </div>
      </div>
    </main>
  );
};

export default TeamMemberDetailPage;
