'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';
import { TeamMemberSchema } from '@/types/team-member';

interface UserWithAdmin extends User {
  admin: boolean;
}

interface AuthContextType {
  loadingAuth: boolean;
  profile: UserWithAdmin | null;
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
  const [admin, setAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchTeamMember = async (userId: string) => {
    const { data: teamMember } = await supabase.from('team_members').select('*').eq('id', userId).single();

    const validatedTeamMember = TeamMemberSchema.parse(teamMember);
    setAdmin(teamMember ? validatedTeamMember.is_admin : false);
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
    profile: user
      ? ({
          ...user,
          admin: admin,
        } as UserWithAdmin)
      : null,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
