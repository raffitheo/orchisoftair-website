'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { Clock, Mail, MapPin, Signature } from 'lucide-react';
import { useEffect, useState } from 'react';

const JoinUsPage = () => {
  const { loadingAuth, profile } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Scrivici ora`;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mt-10 mb-4">
          <Signature className="text-orchi-red" size={32} />

          <h1 className="display-text text-5xl md:text-6xl text-orchi-light">
            SCRIVICI <span className="text-orchi-red">ORA</span>
          </h1>
        </div>

        <p className="text-orchi-light/70 mb-12">
          Siamo sempre felici di entrare in contatto con nuovi appassionati,
          curiosi o futuri compagni di squadra! Scrivici per ricevere
          informazioni sui nostri eventi, per sapere come partecipare o
          semplicemente per conoscerci meglio. Che tu sia alle prime armi o un
          veterano del softair, Gli Orchi Trieste sono pronti ad accoglierti.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="border border-orchi-gray p-6 bg-orchi-gray/20">
              <h2 className="tactical-text text-xl text-orchi-gold mb-2">
                INFORMAZIONI DI CONTATTO
              </h2>

              <div className="space-y-2">
                <div className="flex items-center space-x-4 border-b border-orchi-gray pb-2">
                  <Mail className="h-6 w-6 text-orchi-red" />

                  <div className="flex flex-col lg:flex-row space-between w-full">
                    <div className="flex-1">
                      <p className="text-orchi-light font-semibold">Email</p>

                      <p className="text-orchi-light/80">
                        orchitriestesoftair@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4  border-b border-orchi-gray pb-2">
                  <MapPin className="h-6 w-6 text-orchi-red" />

                  <div className="flex flex-col lg:flex-row space-between w-full gap-2">
                    <div className="flex-1">
                      <p className="text-orchi-light font-semibold">
                        Zona di Operazione
                      </p>

                      <p className="text-orchi-light/80">Trieste e Provincia</p>
                    </div>

                    <div className="flex-1">
                      <p className="text-orchi-light font-semibold">
                        Sede legale
                      </p>

                      <p className="text-orchi-light/80">
                        Via Caccia 11, Trieste, 34129 Italia
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 border-b border-orchi-gray pb-2">
                  <Clock className="h-6 w-6 text-orchi-red" />

                  <div className="flex flex-col lg:flex-row space-between w-full gap-2">
                    <div className="flex-1">
                      <p className="text-orchi-light font-semibold">
                        Incontri in sede
                      </p>

                      <p className="text-orchi-light/80">Mercoledì</p>
                    </div>

                    <div className="flex-1">
                      <p className="text-orchi-light font-semibold">
                        Allenamenti e/o giocate
                      </p>

                      <p className="text-orchi-light/80">Domenica</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-orchi-gray p-6 bg-orchi-gray/20">
              <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                REQUISITI PER UNIRSI
              </h3>

              <ul className="list-disc list-inside space-y-1 text-orchi-light/80">
                <li>Età minima: 14 anni</li>

                <li>Passione per il softair</li>

                <li>Spirito di squadra</li>

                <li>Disponibilità weekend</li>
              </ul>
            </div>

            <div className="border border-orchi-gray p-6 bg-orchi-gray/20">
              <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                COSA OFFRIAMO
              </h3>

              <ul className="list-disc list-inside space-y-1 text-orchi-light/80">
                <li>Allenamenti e/o giocate settimanali</li>

                <li>Partecipazione a tornei</li>

                <li>Supporto per principianti</li>

                <li>Ambiente amichevole</li>
              </ul>
            </div>
          </div>

          <div className="border border-orchi-gray p-8 bg-orchi relative mb-auto">
            <div className="absolute inset-0 bg-tactical-pattern opacity-5"></div>

            <div className="relative z-10">
              <h2 className="tactical-text text-3xl text-center text-orchi-light mb-4">
                FORM DI CONTATTO
              </h2>

              <form className="space-y-2">
                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="name"
                  >
                    NOME <span className="text-orchi-red">*</span>
                  </label>

                  <Input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={profile && !loadingAuth ? true : false}
                    id="name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Mario Rossi"
                    required
                    type="text"
                    value={formData.name}
                  />
                </div>

                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="email"
                  >
                    EMAIL <span className="text-orchi-red">*</span>
                  </label>

                  <Input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={profile && !loadingAuth ? true : false}
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="la.tua.email@esempio.it"
                    required
                    type="email"
                    value={formData.email}
                  />
                </div>

                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="phone"
                  >
                    TELEFONO (opzionale)
                  </label>

                  <Input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={profile && !loadingAuth ? true : false}
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    placeholder="+39 123 456 7890"
                    type="tel"
                    value={formData.phone}
                  />
                </div>

                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="message"
                  >
                    MESSAGGIO <span className="text-orchi-red">*</span>
                  </label>

                  <Textarea
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    disabled={profile && !loadingAuth ? true : false}
                    id="message"
                    name="message"
                    onChange={handleChange}
                    placeholder="Raccontaci la tua esperienza nel softair e perché vuoi unirti agli Orchi..."
                    required
                    rows={6}
                    value={formData.message}
                  />
                </div>

                {profile && !loadingAuth ? (
                  <Button
                    className="w-full bg-orchi-gray/50 text-orchi-light/50 tactical-text py-3 cursor-not-allowed"
                    disabled
                    type="submit"
                  >
                    INVIA
                  </Button>
                ) : (
                  <Button
                    className="cursor-pointer w-full bg-orchi-red hover:bg-orchi-gold tactical-text py-3 transition-colors duration-300"
                    type="submit"
                  >
                    INVIA
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JoinUsPage;
