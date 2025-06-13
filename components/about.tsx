'use client';

import { motion } from 'framer-motion';

import { Card, CardContent } from './ui/card';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-orchi relative overflow-hidden" id="about-us">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          animate="animate"
          className="my-auto"
          initial="initial"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <h2 className="display-text text-5xl md:text-6xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
            CHI SIAMO
          </h2>

          <p className="text-orchi-light/90 mb-10 text-lg leading-relaxed">
            Nati nel {process.env.NEXT_PUBLIC_CREATION_YEAR}, Gli Orchi Trieste sono un punto di riferimento per il
            softair nella città e in tutta la regione Friuli-Venezia Giulia. Da quasi vent’anni promuoviamo questo sport
            con passione, serietà e spirito di squadra, unendo competizione, strategia e divertimento.
            <br />
            <br />
            Partecipiamo attivamente a eventi locali, regionali e nazionali, organizziamo partite amichevoli e tornei,
            ed accogliamo con entusiasmo chiunque voglia scoprire il mondo del softair. Per noi non è solo un gioco: è
            una disciplina che richiede preparazione fisica, prontezza mentale e grande affiatamento.
            <br />
            <br />
            Gli allenamenti e le giocate settimanali sono il cuore della nostra attività. In questi momenti i nostri
            membri affinano tecnica, tattica e coordinazione di squadra, sempre con l’obiettivo di crescere insieme,
            migliorare e divertirsi in modo responsabile.
            <br />
            <br />
            Valori come il fair play, il rispetto delle regole e la sicurezza sono per noi fondamentali. Il nostro è un
            ambiente accogliente e dinamico, dove veterani e neofiti si incontrano per condividere esperienze, crescere
            insieme e portare avanti una comunità unita dalla stessa passione.
            <br />
            <br />
            Se cerchi adrenalina, strategia e spirito di gruppo, ti aspettiamo! Unisciti a Gli Orchi Trieste e vivi con
            noi l’emozione del softair.
          </p>
        </motion.div>

        <motion.div
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <Card className="glass-effect flex border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
            <CardContent className="p-6 my-auto w-full">
              <div className="text-orchi-light/80 tactical-text">PASSIONE AUTENTICA</div>
            </CardContent>
          </Card>

          <Card className="glass-effect flex border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
            <CardContent className="p-6 my-auto w-full">
              <div className="text-orchi-light/80 tactical-text">SPIRITO DI SQUADRA</div>
            </CardContent>
          </Card>

          <Card className="glass-effect flex border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
            <CardContent className="p-6 my-auto w-full">
              <div className="text-orchi-light/80 tactical-text">RISPETTO E FAIR PLAY</div>
            </CardContent>
          </Card>

          <Card className="glass-effect flex border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
            <CardContent className="p-6 my-auto w-full">
              <div className="text-orchi-light/80 tactical-text">CRESCITA CONTINUA</div>
            </CardContent>
          </Card>

          <Card className="glass-effect flex border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
            <CardContent className="p-6 my-auto w-full">
              <div className="text-orchi-light/80 tactical-text">COMUNITÀ E CAMARADERIA</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
