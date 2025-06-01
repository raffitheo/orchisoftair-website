'use client';
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gli eventi', path: '/events' },
  { name: 'La squadra', path: '/team' },
  { name: 'Galleria orchi', path: '/gallery' },
  { name: 'Scrivici ora', path: '/join-us' },
];

const Navbar = () => {
  const pathname = usePathname();

  const [currentRoute, setCurrentRoute] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log('Current pathname:', pathname);

    if (navItems.some((item) => item.path === `/${pathname.split('/')[1]}`))
      setCurrentRoute(`/${pathname.split('/')[1]}`);
    else setCurrentRoute('');
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-orchi/95 backdrop-blur-sm py-3' : 'py-6',
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link className="flex items-center ml-2 md:ml-0" href="/">
          <span className="tactical-text text-orchi-red text-2xl md:text-3xl">
            GLI ORCHI TRIESTE
          </span>

          <span className="tactical-text text-orchi-light text-sm ml-2">
            SOFTAIR TEAM
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              className={`tactical-text ${currentRoute === item.path ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'}`}
              href={item.path}
              key={item.name}
              scroll={item.path.startsWith('#') ? false : true}
              tabIndex={currentRoute === item.path ? -1 : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Toggle menu"
              className="md:hidden h-auto p-2 text-orchi-light hover:text-orchi-gold hover:bg-transparent transition-colors duration-300"
              variant="ghost"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent className="bg-orchi border-orchi-gray w-[80%] sm:max-w-md">
            <SheetHeader className="border-b border-orchi-gray pb-4 mb-4">
              <SheetTitle className="tactical-text text-orchi-red text-2xl">
                GLI ORCHI TRIESTE
              </SheetTitle>

              <span className="tactical-text text-orchi-light text-sm">
                SOFTAIR TEAM
              </span>
            </SheetHeader>

            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link
                    className={`tactical-text text-xl ${currentRoute === item.path ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'} flex items-center`}
                    href={item.path}
                    scroll={item.path.startsWith('#') ? false : true}
                    tabIndex={currentRoute === item.path ? -1 : undefined}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
