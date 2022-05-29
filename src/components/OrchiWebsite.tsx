import React, {
    useEffect,
    useState
} from 'react';

import { NavbarTop } from './NavbarTop/NavbarTop';

import { PageContent } from './OrchiWebsite.style';

export const OrchiWebsite: React.FC = () => {
    var contacts: {
        icon: string,
        title: string,
        info: string
    }[] = [
        {
            icon: 'AtSign',
            title: 'Scrivici',
            info: 'info@orchisoftair.it'
        },
        {
            icon: 'Phone',
            title: 'Chiamaci',
            info: '+39 348 469 1962'
        }
    ];
    var navigation: {
        text: string,
        link: string,
        subMenu?: {
            text: string,
            link: string
        }[]
    }[] = [
        {
            text: 'Home',
            link: '#home'
        },
        {
            text: 'Chi siamo',
            link: '#chi-siamo',
            subMenu: [
                {
                    text: 'L\'associazione',
                    link: '#chi-siamo-l-associazione'
                },
                {
                    text: 'Il team',
                    link: '#chi-siamo-il-team'
                },
                {
                    text: 'Deve giochiamo',
                    link: '#chi-siamo-dove-giochiamo'
                }
            ]
        },
        {
            text: 'Eventi',
            link: '#event',
            subMenu: [
                {
                    text: 'In arrivo',
                    link: '#eventi-in-arrivo'
                },
                {
                    text: 'Storico',
                    link: '#eventi-storico'
                }
            ]
        },
        {
            text: 'Contatti',
            link: '#contatti'
        },
        {
            text: 'Area riservata',
            link: '#area-riservata'
        },
    ];
    var socials: {
        icon: string,
        link: string,
        hoverColor: string
    }[] = [
        {
            link: 'https://www.instagram.com/orchisoftair_official/',
            icon: 'Instagram',
            hoverColor: 'hsl(349, 75%, 31%)'
        },
        {
            link: 'https://www.facebook.com/orchitrieste/',
            icon: 'Facebook',
            hoverColor: 'hsl(349, 75%, 31%)'
        }
    ];

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const onMobileMenuChange = (newValue: boolean): void => {
        var navbar: HTMLElement = document.getElementById('navbar') as HTMLElement;
        var navbarMobile: HTMLElement = document.getElementById('navbar-mobile') as HTMLElement;
        var pageContent: HTMLElement = document.getElementById('page-content') as HTMLElement;

        if (navbar && navbarMobile && pageContent) {
            if (newValue) {
                navbar.style.left = '250px';
                navbar.style.right = '-250px';
                navbarMobile.style.left = '0';
                pageContent.style.transform = 'translateX(250px)';
            } else {
                navbar.style.left = '0';
                navbar.style.right = '0';
                navbarMobile.style.left = '-250px';
                pageContent.style.transform = 'translateX(0)';
            }
        }
    }
    
    useEffect(() => {
        const handleResize = (): void => {
            var width = document.documentElement.offsetWidth;
    
            setIsMobile(!(width >= 768 || width <= 320));
    
            if (width >= 768 || width <= 320) {
                onMobileMenuChange(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <NavbarTop
                contacts={contacts}
                navigation={navigation}
                socials={socials}
                onMobileMenuChange={onMobileMenuChange}
                isMobile={isMobile}
            />

            <PageContent
                id='page-content'
            >
                
            </PageContent>
        </>
    );
}
