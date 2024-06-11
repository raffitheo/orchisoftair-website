import OrchiIcon from '@assets/icons/orchi-icon.webp';
import { HTMLAttributes, forwardRef } from 'react';

import './navbar.sass';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    active?: 'about' | 'contact-us' | 'news';
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
    ({ active, ...props }, ref) => {
        return (
            <div className="navbar-container" ref={ref} {...props}>
                <div className="navbar-box">
                    <div className="navbar-logo">
                        <div className="orchi-logo">
                            <a href="/">
                                <img height={48} src={OrchiIcon} width={52} />
                            </a>
                        </div>
                    </div>

                    <div className="navbar-buttons">
                        <a
                            className={`navbar-button${active === 'about' ? ' active' : ''}`}
                            href="/about"
                        >
                            chi siamo
                        </a>
                        <a
                            className={`navbar-button${active === 'news' ? ' active' : ''}`}
                            href="/news"
                        >
                            news
                        </a>
                        <a
                            className={`navbar-button${active === 'contact-us' ? ' active' : ''}`}
                            href="/contact-us"
                        >
                            contatti
                        </a>
                    </div>
                </div>
            </div>
        );
    },
);
Navbar.displayName = 'Navbar';

export default Navbar;
