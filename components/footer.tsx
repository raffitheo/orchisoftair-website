import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-orchi-gray py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Image
                alt="Gli Orchi Softair Team Logo"
                className="w-20 h-20"
                height={80}
                src="/orchi_logo.png"
                width={80}
              />

              <div className="ml-4">
                <h3 className="tactical-text text-xl text-orchi-light">
                  GLI ORCHI TRIESTE
                </h3>

                <p className="text-sm text-orchi-light/70">SOFTAIR TEAM</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="tactical-text text-orchi-gold mb-4">CONTATTI</h4>
              <ul className="space-y-2">
                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="mailto:orchitriestesoftair@gmail.com">
                    orchitriestesoftair@gmail.com
                  </a>
                </li>

                <li className="text-orchi-light/80">C.F.: 90114470322</li>

                <li className="text-orchi-light/80">
                  Via Caccia 11, Trieste, 34129 Italia
                </li>
              </ul>
            </div>

            <div>
              <h4 className="tactical-text text-orchi-gold mb-4">SEGUICI</h4>
              <ul className="space-y-2">
                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="https://www.facebook.com/orchitrieste/">Facebook</a>
                </li>

                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="https://www.instagram.com/orchisoftair_official/">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="tactical-text text-orchi-gold mb-4">LINK UTILI</h4>
              <ul className="space-y-2">
                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="#">Informativa sulla privacy</a>
                </li>
                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="#">Modello organizzativo</a>
                </li>
                <li className="text-orchi-light/80 hover:text-orchi-light transition-colors">
                  <a href="#">Codice di Condotta</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-orchi-gray/30 pt-6 mt-6 text-center">
          <p className="text-orchi-light/60 text-sm">
            &copy; 2024-2025 Raffaele Valenti. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
