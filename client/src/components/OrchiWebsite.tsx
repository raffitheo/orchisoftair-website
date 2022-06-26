import React, {
    useEffect,
    useState
} from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { NavbarTop } from './NavbarTop/NavbarTop';

import {
    Contacts,
    Navigation,
    Social
} from '../data/navbar';

import { HomePage } from './pages/HomePage/HomePage';

import { PageContent } from './OrchiWebsite.style';

export const OrchiWebsite: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [navbarHeight, setNavbarHeight] = useState<number>(0);

    const baseURL: string = window.location.href.indexOf('github') ? '/orchisoftair-website' : '/';

    const onMobileMenuChange = (newValue: boolean): void => {
        let navbar: HTMLElement = document.getElementById('navbar') as HTMLElement;
        let navbarMobile: HTMLElement = document.getElementById('navbar-mobile') as HTMLElement;
        let pageContent: HTMLElement = document.getElementById('page-content') as HTMLElement;

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
            let width = document.documentElement.offsetWidth;
    
            setIsMobile(!(width >= 768 || width <= 320));
    
            if (width >= 768 || width <= 320)
                onMobileMenuChange(false);

            let navbar = document.getElementById('navbar');

            if (navbar)
                setNavbarHeight(navbar.offsetHeight);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Router>
            <NavbarTop
                contacts={Contacts()}
                navigation={Navigation()}
                socials={Social()}
                onMobileMenuChange={onMobileMenuChange}
                isMobile={isMobile}
            />

            <PageContent
                id='page-content'
            >
                <Routes>
                    <Route
                        element={
                            <HomePage
                                navbarHeight={navbarHeight}
                            />
                        }
                        path={baseURL}
                    />
                </Routes>
            </PageContent>
        </Router>
    );
}
