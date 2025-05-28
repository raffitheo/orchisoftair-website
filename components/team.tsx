'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';
import Loader from './ui/loader';
import TeamMember from '@/interfaces/team-member';

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_random_team_members', {
        limit_count: 6,
      });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
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
          Gli Orchi sono un team forgiato da una dedizione che non conosce
          limiti e da una passione ardente che infiamma ogni nostra azione. Ogni
          membro è uno specialista esperto, maestro nel proprio ruolo cruciale,
          e contribuisce in modo vitale all'equilibrio e all'efficacia della
          nostra strategia complessiva. È questa profonda sinergia, unita alla
          nostra incrollabile coesione e alla fiducia reciproca, che ci
          trasforma in una forza imbattibile sul campo, sempre pronti a lottare
          fianco a fianco per conquistare la vittoria.
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
                className="group relative overflow-hidden bg-orchi-gray/10 border border-orchi-gray hover:border-orchi-gold transition-colors"
                href={`/team/${member.id}`}
                key={member.id}
              >
                <div className="aspect-square overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${member.image_url})` }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-orchi to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="tactical-text text-2xl text-orchi-light mb-1 group-hover:text-orchi-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-orchi-red font-semibold mb-2">
                    {member.field_name}
                  </p>
                  <p className="text-orchi-light/80 text-sm">{member.role}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="inline-block bg-orchi-gray hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
          >
            <Link href="/team">SCOPRI LA SQUADRA</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Team;
