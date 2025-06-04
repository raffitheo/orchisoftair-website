'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { loadingAuth, profile } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Entra`;
  }, []);

  useEffect(() => {
    if (!loadingAuth && profile) router.push('/');
  }, [profile, loadingAuth, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        console.error('Login error:', signInError.message);
        alert("Errore durante l'accesso. Riprova.");
      } else router.push('/');
    } catch (error) {
      console.error('Unexpected error during login:', error);
      alert("Errore imprevisto durante l'accesso. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) {
    return (
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-orchi-light">Caricamento...</div>
        </div>
      </main>
    );
  }

  if (profile) return null;

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1">
          <div className="border border-orchi-gray p-8 bg-orchi relative mb-auto">
            <div className="absolute inset-0 bg-tactical-pattern opacity-5"></div>

            <div className="relative z-10">
              <h2 className="tactical-text text-3xl text-center text-orchi-light mb-4">
                ESEGUI L'ACCESSO
              </h2>

              <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="email"
                  >
                    EMAIL <span className="text-orchi-red">*</span>
                  </label>

                  <Input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={isSubmitting}
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                    type="email"
                    value={formData.email}
                  />
                </div>

                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="password"
                  >
                    PASSWORD <span className="text-orchi-red">*</span>
                  </label>

                  <Input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={isSubmitting}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    required
                    type="password"
                    value={formData.password}
                  />
                </div>

                <Button
                  className="cursor-pointer w-full bg-orchi-red hover:bg-orchi-gold tactical-text py-3 transition-colors duration-300"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'ACCESSO IN CORSO...' : 'ENTRA'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
