'use client';
import React, { Fragment, useState, useEffect } from 'react';
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
import NavigationItem from '@/types/navigation-item';
import { useAuth } from '@/lib/auth-context';

const navigationItems: NavigationItem[] = [
  { id: 1, name: 'Home', path: '/', separator: false },
  { id: 2, name: 'Gli eventi', path: '/events', separator: false },
  { id: 3, name: 'La squadra', path: '/team', separator: false },
  { id: 4, name: 'Galleria orchi', path: '/gallery', separator: false },
  { id: 5, name: 'Scrivici ora', path: '/join-us', separator: false },
];

const Navbar = () => {
  const { loadingAuth, profile, signOut } = useAuth();
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
    if (
      navigationItems.some((item) => item.path === `/${pathname.split('/')[1]}`)
    )
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
          {navigationItems.map((item) => (
            <Fragment key={item.id}>
              {item.separator && (
                <span className="border-l border-orchi-gray h-6"></span>
              )}

              <Link
                className={`tactical-text ${currentRoute === item.path ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'}`}
                href={item.path}
                scroll={item.path.startsWith('#') ? false : true}
                tabIndex={currentRoute === item.path ? -1 : undefined}
              >
                {item.name}
              </Link>
            </Fragment>
          ))}

          {!profile && !loadingAuth ? (
            <>
              <span className="border-l border-orchi-gray h-6"></span>

              <Link
                className={`tactical-text ${currentRoute === '/login' ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'}`}
                href="/login"
                scroll={'/login'.startsWith('#') ? false : true}
                tabIndex={currentRoute === '/login' ? -1 : undefined}
              >
                Entra
              </Link>
            </>
          ) : (
            <>
              <span className="border-l border-orchi-gray h-6"></span>

              <Button
                className="bg-transparent cursor-pointer p-0 h-auto w-auto tactical-text text-orchi-light hover:text-orchi-gold hover:bg-transparent transition-colors duration-200"
                onClick={signOut}
              >
                Esci
              </Button>
            </>
          )}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Toggle menu"
              className="cursor-pointer md:hidden h-auto p-2 text-orchi-light hover:text-orchi-gold hover:bg-transparent transition-colors duration-300"
              variant="ghost"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent className="bg-orchi border border-orchi-gray w-[80%] sm:max-w-md">
            <SheetHeader className="border-b border-orchi-gray pb-4 mb-4">
              <SheetTitle className="tactical-text text-orchi-red text-2xl">
                GLI ORCHI TRIESTE
              </SheetTitle>

              <span className="tactical-text text-orchi-light text-sm">
                SOFTAIR TEAM
              </span>
            </SheetHeader>

            <nav className="flex flex-col space-y-6">
              {navigationItems.map((item) => (
                <>
                  {item.separator && (
                    <span
                      className="border-b border-orchi-gray h-px w-full"
                      key={`separator-${item.id}`}
                    ></span>
                  )}

                  <SheetClose asChild key={item.id}>
                    <Link
                      className={`tactical-text text-xl ${currentRoute === item.path ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'} flex items-center`}
                      href={item.path}
                      scroll={item.path.startsWith('#') ? false : true}
                      tabIndex={currentRoute === item.path ? -1 : undefined}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                </>
              ))}

              {!profile && !loadingAuth ? (
                <>
                  <span className="border-b border-orchi-gray h-px w-full"></span>

                  <SheetClose asChild>
                    <Link
                      className={`tactical-text text-xl ${currentRoute === '/login' ? 'text-orchi-red pointer-events-none' : 'text-orchi-light hover:text-orchi-gold transition-colors duration-200'} flex items-center`}
                      href="/login"
                      scroll={'/login'.startsWith('#') ? false : true}
                      tabIndex={currentRoute === '/login' ? -1 : undefined}
                    >
                      Entra
                    </Link>
                  </SheetClose>
                </>
              ) : (
                <>
                  <span className="border-b border-orchi-gray h-px w-full"></span>

                  <SheetClose asChild>
                    <Button
                      className="bg-transparent cursor-pointer p-0 h-auto tactical-text text-xl text-orchi-light hover:text-orchi-gold hover:bg-transparent transition-colors duration-200 flex items-left justify-start"
                      onClick={signOut}
                    >
                      Esci
                    </Button>
                  </SheetClose>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
