'use client';

import { useEffect } from 'react';
import About from '@/components/about';
import Contact from '@/components/contact';
import Events from '@/components/events';
import Hero from '@/components/hero';
import Team from '@/components/team';

export default function Home() {
  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Home`;
  }, []);

  return (
    <>
      <Hero />

      <About />

      <Events />

      <Team />

      <Contact />
    </>
  );
}
