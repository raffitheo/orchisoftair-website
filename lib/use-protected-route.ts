'use client';

import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useProtectedRoute = () => {
  const { loadingAuth, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !profile) router.push('/login');
  }, [loadingAuth, profile, router]);

  return { loadingAuth, profile };
};
