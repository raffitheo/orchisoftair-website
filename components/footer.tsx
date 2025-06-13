'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { Blocks, Facebook, IdCard, Instagram, Mail, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase';

import { Separator } from './ui/separator';

const Footer = () => {
  const [teamMembersCount, setTeamMembersCount] = useState(0);

  useEffect(() => {
    countTeamMembers();
  }, []);

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

  return (
    <footer className="relative bg-gradient-to-b from-orchi-gray to-orchi overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-tactical-pattern" />
      </div>

      <div className="relative mx-auto px-6 w-full max-w-screen-2xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                <Image
                  className="w-24 h-24 rounded-full border-2 border-orchi-gold max-w-none"
                  alt="Gli Orchi Softair Team Logo"
                  height={96}
                  src="/logo-orchi.webp"
                  width={96}
                />
              </div>

              <div className="ml-6">
                <h3 className="display-text text-2xl text-orchi-light mb-2">GLI ORCHI TRIESTE</h3>

                <p className="tactical-text text-orchi-gold text-sm tracking-wider">SOFTAIR TEAM</p>

                <p className="text-orchi-light/70 text-sm mt-2 max-w-md">
                  Squadra tattica dedicata al softair competitivo e ricreativo nella zona di Trieste
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-orchi-gold mr-2" />

                  <span className="tactical-text text-xl text-orchi-light">{teamMembersCount}</span>
                </div>

                <p className="text-orchi-light/60 text-xs">MEMBRI ATTIVI</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Blocks className="w-5 h-5 text-orchi-gold mr-2" />

                  <span className="tactical-text text-xl text-orchi-light">
                    {process.env.NEXT_PUBLIC_CREATION_YEAR}
                  </span>
                </div>

                <p className="text-orchi-light/60 text-xs">FONDAZIONE</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="tactical-text text-orchi-gold mb-6 text-lg">CONTATTI</h4>

            <div className="flex flex-col space-y-4">
              <Link
                className="group flex mr-auto items-center text-orchi-light/80 hover:text-orchi-gold transition-colors"
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                target="_blank"
              >
                <Mail className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />

                <span className="text-sm">{process.env.NEXT_PUBLIC_EMAIL}</span>
              </Link>

              <div className="flex items-center text-orchi-light/80">
                <IdCard className="w-4 h-4 mr-3" />

                <span className="text-sm">C.F. {process.env.NEXT_PUBLIC_CF}</span>
              </div>

              <div className="flex items-center text-orchi-light/80">
                <MapPin className="w-4 h-4 mr-3" />

                <span className="text-sm">{process.env.NEXT_PUBLIC_ADDRESS}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="tactical-text text-orchi-gold mb-6 text-lg">SEGUICI</h4>

            <div className="flex flex-col space-y-4 mb-8">
              <Link
                className="group mr-auto flex items-center text-orchi-light/80 hover:text-orchi-gold transition-colors"
                href="https://www.facebook.com/orchitrieste/"
                target="_blank"
              >
                <Facebook className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />

                <span className="text-sm">Facebook</span>
              </Link>

              <Link
                className="group mr-auto flex items-center text-orchi-light/80 hover:text-orchi-gold transition-colors"
                href="https://www.instagram.com/orchisoftair_official/"
                target="_blank"
              >
                <Instagram className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />

                <span className="text-sm">Instagram</span>
              </Link>
            </div>

            <h4 className="tactical-text text-orchi-gold mb-4 text-sm">LINK UTILI</h4>

            <div className="flex flex-col space-y-2">
              <Link
                className="block mr-auto text-orchi-light/60 hover:text-orchi-light transition-colors text-xs"
                href="#"
              >
                Informativa sulla privacy
              </Link>

              <Link
                className="block mr-auto text-orchi-light/60 hover:text-orchi-light transition-colors text-xs"
                href="#"
              >
                Modello organizzativo
              </Link>

              <Link
                className="block mr-auto text-orchi-light/60 hover:text-orchi-light transition-colors text-xs"
                href="#"
              >
                Codice di condotta
              </Link>
            </div>
          </div>
        </div>

        <Separator className="bg-orchi-gray/30" />

        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-orchi-light/60 text-xs mb-4 md:mb-0">
              &copy; 2024-2025 Raffaele Valenti. Tutti i diritti riservati.
            </p>

            <div className="flex items-center space-x-6">
              <span className="text-orchi-light/40 text-xs tactical-text">TACTICAL • UNITY • HONOR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
