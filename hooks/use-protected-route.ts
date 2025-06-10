'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/auth-context';

export const useProtectedRoute = () => {
  const { loadingAuth, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !profile) router.push('/login');
  }, [loadingAuth, profile, router]);

  return { loadingAuth, profile };
};
