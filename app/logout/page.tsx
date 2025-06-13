'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loader from '@/components/ui/loader';
import { useAuth } from '@/lib/auth-context';

const LogoutPage = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Uscita in corso...`;
  }, []);

  useEffect(() => {
    signOut().then(() => router.push('/'));
  }, []);

  return (
    <div className="flex h-[100dvh] w-[100dvw]">
      <Loader className="m-auto" size="lg" text="Uscita in corso..." />
    </div>
  );
};

export default LogoutPage;
