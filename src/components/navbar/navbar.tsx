import OrchiIcon from '@assets/icons/orchi-icon.webp';
import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.sass';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: 'about' | 'contact-us' | 'news' | undefined;
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
    ({ active, ...props }, ref) => {
        return (
            <div className="navbar-container" ref={ref} {...props}>
                <div className="navbar-box">
                    <div className="navbar-logo">
                        <div className="orchi-logo">
                            <Link to="/">
                                <img height={48} src={OrchiIcon} width={52} />
                            </Link>
                        </div>
                    </div>

                    <div className="navbar-buttons">
                        <Link
                            className={`navbar-button${active === 'about' ? ' active' : ''}`}
                            to="/about"
                        >
                            chi siamo
                        </Link>
                        <Link
                            className={`navbar-button${active === 'news' ? ' active' : ''}`}
                            to="/news"
                        >
                            news
                        </Link>
                        <Link
                            className={`navbar-button${active === 'contact-us' ? ' active' : ''}`}
                            to="/contact-us"
                        >
                            contatti
                        </Link>
                    </div>
                </div>
            </div>
        );
    },
);
Navbar.displayName = 'Navbar';

export type { NavbarProps };
export default Navbar;
