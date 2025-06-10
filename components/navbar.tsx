'use client';

import React from 'react';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import NavigationItem from '@/types/navigation-item';

const navigationItems: NavigationItem[] = [
  { id: 1, name: 'Home', path: '/', separator: false },
  { id: 2, name: 'Gli eventi', path: '/events', separator: false },
  { id: 3, name: 'La squadra', path: '/team', separator: false },
  { id: 4, name: 'Galleria orchi', path: '/gallery', separator: false },
  { id: 5, name: 'Scrivici ora', path: '/contact-us', separator: false },
];

const navLinkClass = (active: boolean) =>
  cn(
    'tactical-text text-sm transition-all duration-300 relative group py-2',
    active ? 'pointer-events-none text-orchi-gold' : 'text-orchi-light hover:text-orchi-gold'
  );

const underlineClass = (active: boolean) =>
  cn(
    'absolute bottom-0 left-0 w-0 h-0.5 bg-orchi-gold transition-all duration-300',
    active ? 'w-full' : 'group-hover:w-full'
  );

const Navbar = () => {
  const { loadingAuth, profile } = useAuth();
  const pathname = usePathname();
  const isScrolled = useScrollThreshold(20);

  const currentRoute = `/${pathname?.split('/')[1] ?? ''}`;

  const renderNavLink = (item: NavigationItem) => (
    <React.Fragment key={item.id}>
      {item.separator && <span className="border-l border-orchi-gray h-6" />}

      <Link
        className={navLinkClass(currentRoute === item.path)}
        href={item.path}
        scroll={!item.path.startsWith('#')}
        tabIndex={currentRoute === item.path ? -1 : undefined}
      >
        {item.name}
        <span className={underlineClass(currentRoute === item.path)} />
      </Link>
    </React.Fragment>
  );

  const renderMobileNavLink = (item: NavigationItem) => (
    <React.Fragment key={item.id}>
      {item.separator && <span className="border-b border-orchi-gray h-px w-full" />}

      <SheetClose asChild>
        <Link
          className={cn(
            'tactical-text text-lg transition-colors duration-300 flex items-center py-2',
            currentRoute === item.path
              ? 'pointer-events-none text-orchi-gold'
              : 'text-orchi-light hover:text-orchi-gold'
          )}
          href={item.path}
          scroll={!item.path.startsWith('#')}
          tabIndex={currentRoute === item.path ? -1 : undefined}
        >
          {item.name}
        </Link>
      </SheetClose>
    </React.Fragment>
  );

  const renderAuthLink = () => {
    const loginPath = '/login';
    const isLogin = currentRoute === loginPath;

    const logoutPath = '/logout';
    const isLogout = currentRoute === logoutPath;

    if (!profile || loadingAuth) {
      return (
        <>
          <span className="border-l border-orchi-gray h-6" />

          <Link className={navLinkClass(isLogin)} href={loginPath} scroll tabIndex={isLogin ? -1 : undefined}>
            ENTRA
            <span className={underlineClass(isLogin)} />
          </Link>
        </>
      );
    }

    return (
      <>
        <span className="border-l border-orchi-gray h-6" />

        <Link className={navLinkClass(isLogout)} href={logoutPath} scroll tabIndex={isLogout ? -1 : undefined}>
          ESCI
          <span className={underlineClass(isLogin)} />
        </Link>
      </>
    );
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isScrolled ? 'bg-orchi/95 backdrop-blur-lg border-b border-orchi-gray/20 py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link className="flex items-center space-x-3 group" href="/">
            <div className="flex flex-col items-start transform group-hover:scale-105 transition-transform duration-300">
              <span className="tactical-text text-orchi-red text-2xl md:text-3xl leading-none">GLI ORCHI TRIESTE</span>

              <span className="tactical-text text-orchi-light text-xs md:text-sm leading-none opacity-80">
                SOFTAIR TEAM
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-8 mr-8">
              {navigationItems.map(renderNavLink)}
              {renderAuthLink()}
            </div>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Toggle menu"
                className="lg:hidden h-auto p-2 text-orchi-light hover:text-orchi-gold hover:bg-orchi-gray/20 transition-all duration-300"
                variant="ghost"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-orchi/95 backdrop-blur-xl border-orchi-gray/30 w-[85%] sm:max-w-md">
              <SheetHeader className="border-b border-orchi-gray/30 pb-6 mb-6">
                <SheetTitle className="tactical-text text-orchi-red text-2xl">GLI ORCHI TRIESTE</SheetTitle>

                <span className="tactical-text text-orchi-light text-sm opacity-80">SOFTAIR TEAM</span>
              </SheetHeader>

              <nav className="flex flex-col space-y-6">
                {navigationItems.map(renderMobileNavLink)}

                <span className="border-b border-orchi-gray h-px w-full" />

                <SheetClose asChild>
                  {!profile || loadingAuth ? (
                    <Link
                      className={cn(
                        'tactical-text text-lg text-orchi-light hover:text-orchi-gold transition-colors duration-300 flex items-center py-2',
                        currentRoute === '/login'
                          ? 'pointer-events-none text-orchi-gold'
                          : 'text-orchi-light hover:text-orchi-gold'
                      )}
                      href="/login"
                      tabIndex={currentRoute === '/login' ? -1 : undefined}
                    >
                      ENTRA
                    </Link>
                  ) : (
                    <Link
                      className={cn(
                        'tactical-text text-lg text-orchi-light hover:text-orchi-gold transition-colors duration-300 flex items-center py-2',
                        currentRoute === '/logout'
                          ? 'pointer-events-none text-orchi-gold'
                          : 'text-orchi-light hover:text-orchi-gold'
                      )}
                      href="/logout"
                      tabIndex={currentRoute === '/logout' ? -1 : undefined}
                    >
                      ESCI
                    </Link>
                  )}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
