import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-[url('/tactical-bg.jpg')] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5))',
        }}
      />

      <div className="absolute inset-0 z-10 bg-orchi/70" />

      <div className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center">
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8">
          <Image
            alt="Gli Orchi Softair Team Logo"
            className="w-full animate-slow-pulse"
            height={512}
            src="/logo-orchi.webp"
            width={512}
          />
        </div>

        <h1 className="display-text text-4xl md:text-6xl lg:text-7xl text-orchi-light mb-4 gritty-shadow">
          GLI ORCHI <span className="text-orchi-red">TRIESTE</span>
        </h1>

        <p className="tactical-text text-xl md:text-2xl text-orchi-light mb-8 max-w-2xl">
          Una squadra, una famiglia, una passione condivisa!
        </p>

        <Button
          asChild
          className="inline-block bg-orchi-red hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
        >
          <Link href="#about-us">SCOPRI DI PIÙ</Link>
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="text-orchi-light" size={30} />
      </div>
    </section>
  );
};

export default Hero;
