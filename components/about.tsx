const About = () => {
  return (
    <section className="py-20 bg-orchi" id="about-us">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div>
            <h2 className="text-center display-text text-4xl md:text-5xl text-orchi-light mb-4">
              CHI <span className="text-orchi-red">SIAMO</span>
            </h2>

            <p className="text-orchi-light/80 mb-6">
              Nati nel 2007, Gli Orchi Trieste sono un punto di riferimento per il softair nella città e in tutta la
              regione Friuli-Venezia Giulia. Da quasi vent’anni promuoviamo questo sport con passione, serietà e spirito
              di squadra, unendo competizione, strategia e divertimento.
            </p>

            <p className="text-orchi-light/80 mb-6">
              Partecipiamo attivamente a eventi locali, regionali e nazionali, organizziamo partite amichevoli e tornei,
              ed accogliamo con entusiasmo chiunque voglia scoprire il mondo del softair. Per noi non è solo un gioco: è
              una disciplina che richiede preparazione fisica, prontezza mentale e grande affiatamento.
            </p>

            <p className="text-orchi-light/80 mb-6">
              Gli allenamenti e le giocate settimanali sono il cuore della nostra attività. In questi momenti i nostri
              membri affinano tecnica, tattica e coordinazione di squadra, sempre con l’obiettivo di crescere insieme,
              migliorare e divertirsi in modo responsabile.
            </p>

            <p className="text-orchi-light/80 mb-6">
              Valori come il fair play, il rispetto delle regole e la sicurezza sono per noi fondamentali. Il nostro è
              un ambiente accogliente e dinamico, dove veterani e neofiti si incontrano per condividere esperienze,
              crescere insieme e portare avanti una comunità unita dalla stessa passione.
            </p>

            <p className="text-orchi-light/80 mb-12">
              Se cerchi adrenalina, strategia e spirito di gruppo, ti aspettiamo! Unisciti a Gli Orchi Trieste e vivi
              con noi l’emozione del softair.
            </p>

            <div className="flex flex-wrap justify-start gap-4 mt-8">
              <div className="bg-orchi-gray px-4 py-2">
                <span className="text-orchi-light tactical-text">PASSIONE AUTENTICA</span>
              </div>

              <div className="bg-orchi-gray px-4 py-2">
                <span className="text-orchi-light tactical-text">SPIRITO DI SQUADRA</span>
              </div>

              <div className="bg-orchi-gray px-4 py-2">
                <span className="text-orchi-light tactical-text">RISPETTO E FAIR PLAY</span>
              </div>

              <div className="bg-orchi-gray px-4 py-2">
                <span className="text-orchi-light tactical-text">CRESCITA CONTINUA</span>
              </div>

              <div className="bg-orchi-gray px-4 py-2">
                <span className="text-orchi-light tactical-text">COMUNITÀ E CAMARADERIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
