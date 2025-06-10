'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import Loader from '@/components/ui/loader';
import { useAuth } from '@/lib/auth-context';

const LogoutPage = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut().then(() => redirect('/'));
  }, []);

  return (
    <div className="flex h-[100dvh] w-[100dvw]">
      <Loader className="m-auto" size="lg" text="Uscita in corso..." />
    </div>
  );
};

export default LogoutPage;
