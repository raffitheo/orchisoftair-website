import { HTMLAttributes, forwardRef } from 'react';

import './navbar.css';

import OrchiIcon from '../../assets/orchi-icon.webp';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(({ ...props }, ref) => {
    return (
        <div className="navbar" ref={ref} {...props}>
            <div className="navbar-box">
                <div className="navbar-logo">
                    <div className="orchi-logo">
                        <a href="/">
                            <img height={48} src={OrchiIcon} width={52} />
                        </a>
                    </div>
                </div>

                <div className="navbar-buttons">
                    <a className="navbar-button" href="/about">
                        chi siamo
                    </a>
                    <a className="navbar-button" href="/news">
                        news
                    </a>
                    <a className="navbar-button" href="/contact-us">
                        contatti
                    </a>
                </div>
            </div>
        </div>
    );
});

export default Navbar;
