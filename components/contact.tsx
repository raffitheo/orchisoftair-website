'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    phone: '',
  });

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
    <section className="py-20 bg-orchi relative" id="contacts">
      <div className="absolute inset-0 bg-[url('/join-bg.jpg')] bg-cover bg-center opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-center display-text text-4xl md:text-5xl text-orchi-light mb-4">
              UNISCITI <span className="text-orchi-red">AGLI ORCHI</span>
            </h2>

            <p className="text-orchi-light/80 mb-6">
              Stai cercando una squadra di softair seria ma amichevole a
              Trieste? Gli Orchi sono sempre alla ricerca di nuovi membri
              appassionati che vogliano crescere insieme a noi.
            </p>

            <p className="text-orchi-light/80 mb-6">
              Non importa il tuo livello di esperienza, quello che conta è la
              passione per il softair e la voglia di fare squadra. Contattaci
              per maggiori informazioni o per partecipare a una sessione di
              prova.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <div className="bg-orchi-red w-2 h-2 mr-3"></div>
                <span className="text-orchi-light">
                  Sessioni di allenamento o giocate settimanali
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-orchi-red w-2 h-2 mr-3"></div>
                <span className="text-orchi-light">
                  Partecipazione a tornei locali, regionali e nazionali
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-orchi-red w-2 h-2 mr-3"></div>
                <span className="text-orchi-light">
                  Atmosfera amichevole ma competitiva
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-20 p-8 bg-orchi-gray/20 border border-orchi-gray relative">
            <div className="absolute inset-0 bg-tactical-pattern opacity-5"></div>

            <div className="relative z-10">
              <h2 className="tactical-text text-3xl text-center text-orchi-light mb-4">
                CONTATTACI
              </h2>

              <form className="space-y-6">
                <div>
                  <label
                    className="block text-orchi-light mb-2 tactical-text"
                    htmlFor="name"
                  >
                    NOME <span className="text-orchi-red">*</span>
                  </label>

                  <input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
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

                  <input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
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

                  <input
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
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

                  <textarea
                    className="w-full bg-orchi-gray/50 border border-orchi-gray text-orchi-light p-3 focus:border-orchi-gold focus:outline-none"
                    id="message"
                    name="message"
                    onChange={handleChange}
                    placeholder="Raccontaci la tua esperienza nel softair e perché vuoi unirti agli Orchi..."
                    required
                    rows={4}
                    value={formData.message}
                  ></textarea>
                </div>

                <Button
                  className="w-full bg-orchi-red hover:bg-orchi-gold tactical-text py-3 transition-colors duration-300"
                  type="submit"
                >
                  INVIA
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
