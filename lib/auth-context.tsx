'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { Session, User } from '@supabase/supabase-js';

import TeamMember from '@/types/team-member';

import { supabase } from './supabase';

interface AuthContextType {
  loadingAuth: boolean;
  profile: {
    teamMember: TeamMember | null;
    user: User | null;
  } | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loadingAuth: true,
  profile: null,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchTeamMember = async (userId: string) => {
    const { data: teamMemberData } = await supabase.from('team_members').select('*').eq('id', userId).single();

    setTeamMember(teamMemberData ?? null);
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      if (session?.user) fetchTeamMember(session.user.id);

      setLoadingAuth(false);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) fetchTeamMember(session.user.id);

      setLoadingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    loadingAuth,
    profile:
      teamMember && user
        ? {
            teamMember,
            user,
          }
        : null,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
