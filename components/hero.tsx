'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/tactical-pattern.png')] bg-cover bg-center bg-fixed bg-[rgba(18,18,18,0.7)] bg-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-orchi/90 via-orchi/80 to-orchi/90" />
      </div>

      <div className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          animate="animate"
          className="max-w-lg mb-12"
          initial="initial"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <Image
            alt="Gli Orchi Softair Team Logo"
            className="w-full drop-shadow-2xl"
            height={512}
            priority
            src="/logo-orchi.webp"
            width={512}
          />
        </motion.div>

        <motion.div
          animate="animate"
          className="mb-8"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <h1 className="display-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-orchi-light mb-4 leading-tight">
            <span className="text-orchi-red">GLI ORCHI</span>{' '}
            <span className="text-orchi-gold animate-text-flicker">TRIESTE</span>
          </h1>

          <p className="tactical-text text-lg sm:text-xl md:text-2xl text-orchi-light/90 max-w-3xl mx-auto leading-relaxed">
            Una squadra, una famiglia, una passione condivisa!
          </p>
        </motion.div>

        <motion.div
          animate="animate"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeInOut' }}
          variants={fadeInUp}
        >
          <Link
            className="inline-block rounded-lg bg-orchi-red hover:bg-orchi-gold text-white tactical-text transform hover:scale-105 h-12 py-3 px-8 transition-all duration-300"
            href="#about-us"
          >
            SCOPRI DI PIÙ
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2">
          <ArrowDown className="text-orchi-light/80 hover:text-orchi-gold transition-colors duration-300" size={30} />
          <span className="tactical-text text-xs text-orchi-light/90">SCORRI</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
