'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';

export const useProtectedRoute = (admin?: boolean, redirect?: string) => {
  const { loadingAuth, profile } = useAuth();
  const router = useRouter();

  const roleChecked = useRef(false);

  useEffect(() => {
    if (loadingAuth || roleChecked.current) return;

    roleChecked.current = true;

    if (admin) {
      if (!profile || !profile.admin) {
        toast.error('Non sei un amministratore!', {
          description: 'Non è stato assegnato il ruolo per visualizzare questo contenuto.',
        });

        router.push(redirect || '/login');
      }
    } else {
      if (!profile) {
        toast.error('Non sei autorizzato!', {
          description: 'Devi essere autenticato per visualizzare questo contenuto.',
        });

        router.push(redirect || '/login');
      }
    }
  }, [loadingAuth, profile, router]);

  return { loadingAuth, profile };
};
