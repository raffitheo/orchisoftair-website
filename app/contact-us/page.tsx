'use client';

import { useEffect, useState } from 'react';

import { Label } from '@radix-ui/react-label';
import { motion } from 'framer-motion';
import { AtSign, Clock, HandHelping, Mail, MapPin, Octagon, Phone, User } from 'lucide-react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import InputWithIcon from '@/components/ui/input-with-icon';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const isDisabled = !!profile || loadingAuth;

  const contactInfo = [
    {
      icon: Mail,
      info: [
        {
          title: 'Email',
          value: 'orchitriestesoftair@gmail.com',
        },
      ],
    },
    {
      icon: MapPin,
      info: [
        {
          title: 'Zona di Operazione',
          value: 'Trieste e Provincia',
        },
        {
          title: 'Sede legale',
          value: 'Via Caccia 11, Trieste, 34129 Italia',
        },
      ],
    },
    {
      icon: Clock,
      info: [
        {
          title: 'Incontri in sede',
          value: 'Mercoledì',
        },
        {
          title: 'Allenamenti e/o giocate',
          value: 'Domenica',
        },
      ],
    },
  ];

  const requirements = [
    'Età minima: 14 anni',
    'Passione per il softair',
    'Spirito di squadra',
    'Disponibilità nei weekend',
  ];

  const ourOffer = [
    'Allenamenti e/o giocate settimanali',
    'Partecipazione a tornei locali, regionali e nazionali',
    'Supporto per principianti',
    'Ambiente amichevole',
  ];

  const contactFields = [
    {
      displayName: 'NOME',
      icon: User,
      id: 'name',
      field: 'input',
      name: 'name',
      placeholder: 'Mario Rossi',
      required: true,
      type: 'text',
      value: formData.name,
    },
    {
      displayName: 'EMAIL',
      icon: AtSign,
      id: 'email',
      field: 'input',
      name: 'email',
      placeholder: 'la.tua.email@esempio.it',
      required: true,
      type: 'email',
      value: formData.email,
    },
    {
      displayName: 'TELEFONO',
      icon: Phone,
      id: 'phone',
      field: 'input',
      name: 'phone',
      placeholder: '+39 123 456 7890',
      required: false,
      type: 'tel',
      value: formData.phone,
    },
    {
      displayName: 'MESSAGGIO',
      id: 'message',
      field: 'textarea',
      name: 'message',
      placeholder: 'Raccontaci la tua esperienza nel softair e perché vuoi unirti agli Orchi...',
      required: true,
      type: 'text',
      value: formData.message,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orchi via-orchi/95 to-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            animate="animate"
            className="mb-12"
            initial="initial"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <h1 className="display-text text-5xl md:text-7xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-6">
              SCRIVICI ORA
            </h1>

            <p className="text-orchi-light/90 text-xl leading-relaxed">
              Siamo sempre felici di entrare in contatto con nuovi appassionati, curiosi o futuri compagni di squadra!
              Scrivici per ricevere informazioni sui nostri eventi, per sapere come partecipare o semplicemente per
              conoscerci meglio. Che tu sia alle prime armi o un veterano del softair, Gli Orchi Trieste sono pronti ad
              accoglierti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col space-y-8">
              <motion.div
                animate="animate"
                initial="initial"
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
                variants={fadeInUp}
              >
                <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                      <Mail className="h-8 w-8" />
                      INFORMAZIONI DI CONTATTO
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-col space-y-6">
                      {contactInfo.map((contact, contactIndex) => {
                        const IconComponent = contact.icon;

                        return (
                          <div
                            className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                            key={contactIndex}
                          >
                            <IconComponent className="h-8 w-8 text-orchi-red" />

                            <div className="flex flex-col lg:flex-row space-between w-full">
                              {contact.info.map((info, infoIndex) => (
                                <div className="flex-1" key={infoIndex}>
                                  <p className="text-orchi-light font-semibold">{info.title}</p>

                                  <p className="text-orchi-light/80">{info.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                animate="animate"
                initial="initial"
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
                variants={fadeInUp}
              >
                <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                      <Octagon className="h-8 w-8" />
                      REQUISITI PER UNIRSI
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ul className="flex flex-col space-y-6">
                      {requirements.map((requirement, index) => (
                        <li
                          className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                          key={index}
                        >
                          <div className="bg-orchi-red w-2 h-2 rounded-full" />

                          <span className="text-orchi-light text-lg">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                animate="animate"
                initial="initial"
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
                variants={fadeInUp}
              >
                <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex gap-4 display-text text-3xl text-orchi-gold">
                      <HandHelping className="h-8 w-8" />
                      COSA OFFRIAMO
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ul className="flex flex-col space-y-6">
                      {ourOffer.map((offer, index) => (
                        <li
                          className="flex items-center space-x-4 p-4 rounded-xl glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300"
                          key={index}
                        >
                          <div className="bg-orchi-red w-2 h-2 rounded-full" />

                          <span className="text-orchi-light text-lg">{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              animate="animate"
              initial="initial"
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeInOut' }}
              variants={fadeInUp}
            >
              <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orchi-red to-orchi-gold rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>

                  <CardTitle className="display-text text-3xl text-orchi-light">FORM DI CONTATTO</CardTitle>

                  <CardDescription className="text-orchi-light/70">
                    Scrivici un messaggio, ti risponderemo a breve!
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    {contactFields.map((field, index) => {
                      const IconComponent = field.icon;

                      return (
                        <div className="space-y-2" key={index}>
                          <Label className="tactical-text text-orchi-light text-sm" htmlFor={field.id}>
                            {field.displayName}
                            {field.required && (
                              <>
                                {' '}
                                <span className="text-orchi-red">*</span>
                              </>
                            )}
                          </Label>

                          {field.field === 'input' ? (
                            <InputWithIcon
                              disabled={isDisabled}
                              icon={
                                IconComponent && (
                                  <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orchi-light/60" />
                                )
                              }
                              id={field.id}
                              onChange={handleChange}
                              name={field.name}
                              placeholder={field.placeholder}
                              required={field.required}
                              type={field.type}
                              value={field.value}
                            />
                          ) : (
                            <Textarea
                              className="bg-orchi-gray/20 border-orchi-gray/40 text-orchi-light placeholder:text-orchi-light/50 focus:border-orchi-gold mt-1"
                              disabled={isDisabled}
                              id={field.id}
                              name={field.name}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              rows={6}
                              value={field.value}
                            />
                          )}
                        </div>
                      );
                    })}

                    <Button
                      className={cn(
                        'w-full',
                        isDisabled ? 'cursor-not-allowed bg-orchi-gray/50 text-orchi-light/50 hover:scale-100' : ''
                      )}
                      tabIndex={isDisabled ? -1 : undefined}
                      type="submit"
                    >
                      INVIA
                    </Button>

                    {isDisabled && (
                      <p className="text-orchi-light/70 text-sm text-center">
                        Essendo già membro degli Orchi, la possibilità di inviarci una richiesta di contatto è stata
                        disabilitata.
                      </p>
                    )}
                  </form>
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

export default JoinUsPage;
