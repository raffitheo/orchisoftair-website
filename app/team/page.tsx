'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import TeamMember from '@/types/team-member';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/ui/loader';

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (loading)
      document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento squadra...`;
    else {
      if (teamMembers.length > 0)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | La squadra`;
      else
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessun membro trovato`;
    }
  }, [teamMembers, loading]);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase.from('team_members').select('*');

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-28">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mt-10 mb-4">
          <Users className="text-orchi-red" size={32} />

          <h1 className="display-text text-5xl md:text-6xl text-orchi-light">
            LA <span className="text-orchi-red">SQUADRA</span>
          </h1>
        </div>

        <p className="text-orchi-light/70 mb-12">
          Gli Orchi sono un team forgiato da una dedizione che non conosce
          limiti e da una passione ardente che infiamma ogni nostra azione. Ogni
          membro è uno specialista esperto, maestro nel proprio ruolo cruciale,
          e contribuisce in modo vitale all'equilibrio e all'efficacia della
          nostra strategia complessiva. È questa profonda sinergia, unita alla
          nostra incrollabile coesione e alla fiducia reciproca, che ci
          trasforma in una forza imbattibile sul campo, sempre pronti a lottare
          fianco a fianco per conquistare la vittoria.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            teamMembers.map((member) => (
              <Link
                className="block h-full"
                href={`/team/${member.id}`}
                key={member.id}
              >
                <Card className="overflow-hidden bg-orchi-gray/10 border-orchi-gray hover:border-orchi-gold transition-all group h-full">
                  <div className="aspect-square overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${member.image_url || '/team-member-placeholder.png'})`,
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

                      <span className="text-orchi-gold">{member.role}</span>
                    </div>

                    <p className="text-orchi-light/80 mb-4 line-clamp-3">
                      {member.bio?.replace(/\\n/g, '\n')}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-orchi-light/60 text-sm">
                        Membro dal {member.year_joined}
                      </span>

                      <span className="inline-block tactical-text text-orchi-gold border-b border-orchi-gold group-hover:text-orchi-red group-hover:border-orchi-red transition-colors">
                        PROFILO COMPLETO
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
              UNISCITI AGLI ORCHI
            </h2>

            <p className="text-center text-orchi-light/70 mb-6 max-w-2xl mx-auto">
              Sei appassionato di softair e cerchi una squadra seria con cui
              crescere e competere? Gli Orchi sono sempre alla ricerca di nuovi
              talenti da integrare nel team.
            </p>

            <div className="text-center">
              <Link
                className="inline-block bg-orchi-red hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
                href="/join-us"
              >
                CANDIDATI ORA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamPage;
