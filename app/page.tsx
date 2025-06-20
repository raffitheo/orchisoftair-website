'use client';

import { useEffect } from 'react';

import Footer from '@/components/footer';
import About from '@/components/home/about';
import Contact from '@/components/home/contact';
import Events from '@/components/home/events';
import Hero from '@/components/home/hero';
import Team from '@/components/home/team';
import Navbar from '@/components/navbar';

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
