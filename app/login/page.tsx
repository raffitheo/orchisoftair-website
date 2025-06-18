'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { AtSign, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputWithIcon from '@/components/ui/input-with-icon';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      router.push('/');
    } catch (error) {
      console.error('Error logging in the user:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il login. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
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
    <div className="min-h-screen bg-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              animate="animate"
              initial="initial"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orchi-red to-orchi-gold rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>

                  <CardTitle className="display-text text-3xl text-orchi-light">ACCESSO RISERVATO</CardTitle>

                  <CardDescription className="text-orchi-light/70">
                    Accedi alla tua area personale degli Orchi
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                      <Label className="tactical-text text-orchi-light text-sm" htmlFor="email">
                        EMAIL <span className="text-orchi-red">*</span>
                      </Label>

                      <InputWithIcon
                        disabled={isSubmitting}
                        icon={
                          <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orchi-light/60" />
                        }
                        id="email"
                        onChange={handleChange}
                        name="email"
                        placeholder="la.tua.email@esempio.it"
                        required
                        type="email"
                        value={formData.email}
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label className="tactical-text text-orchi-light text-sm" htmlFor="password">
                        PASSWORD <span className="text-orchi-red">*</span>
                      </Label>

                      <InputWithIcon
                        disabled={isSubmitting}
                        icon={
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orchi-light/60" />
                        }
                        id="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="********"
                        required
                        type="password"
                        value={formData.password}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center text-orchi-light/70">
                        <Checkbox className="mr-2 border-orchi-gold data-[state=checked]:bg-orchi-gold" />
                        Ricordami
                      </label>

                      <Link
                        className="text-orchi-gold hover:text-orchi-red transition-colors"
                        href="/password-dimenticata"
                      >
                        Password dimenticata?
                      </Link>
                    </div>

                    <Button
                      className="w-full"
                      disabled={isSubmitting}
                      tabIndex={isSubmitting ? -1 : undefined}
                      type="submit"
                    >
                      {isSubmitting ? 'ACCESSO IN CORSO...' : "ACCEDI ALL'AREA RISERVATA"}
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-orchi-gray/30">
                    <div className="text-center text-sm text-orchi-light/70">Non hai ancora un account?</div>

                    <Button
                      className="w-full mt-3"
                      disabled={isSubmitting}
                      tabIndex={isSubmitting ? -1 : undefined}
                      variant="outline"
                    >
                      RICHIEDI ACCESSO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              animate="animate"
              initial="initial"
              transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 mt-6">
                <CardContent className="p-6 text-center">
                  <h3 className="tactical-text text-orchi-gold mb-3">AREA RISERVATA AI MEMBRI</h3>

                  <p className="text-orchi-light/70 text-sm leading-relaxed">
                    L'accesso è riservato ai membri attivi della squadra Gli Orchi Trieste. Se vuoi unirti a noi,
                    contattaci attraverso la sezione dedicata.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
