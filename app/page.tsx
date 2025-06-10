'use client';

import { useEffect } from 'react';

import About from '@/components/about';
import Contact from '@/components/contact';
import Events from '@/components/events';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Team from '@/components/team';

export default function Home() {
  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Home`;
  }, []);

  return (
    <div className="min-h-screen bg-orchi text-orchi-light">
      <Navbar />

      <Hero />

      <About />

      <Events />

      <Team />

      <Contact />

      <Footer />
    </div>
  );
}
