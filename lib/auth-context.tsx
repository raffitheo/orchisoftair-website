'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { TeamMemberSchema } from '@/types/team-member';
import { supabase } from '@/lib/supabase';
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
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [profile, setProfile] = useState<UserWithAdmin | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: teamMember } = await supabase
            .from('team_members')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const validatedTeamMember = TeamMemberSchema.parse(teamMember);

          setProfile({
            ...session.user,
            admin: validatedTeamMember.is_admin,
          });
        } catch (error) {
          console.error('Error fetching or validating team member profile:', error);

          await supabase.auth.signOut();
          setProfile(null);
        }
      } else setProfile(null);

      setLoadingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    loadingAuth,
    profile,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
