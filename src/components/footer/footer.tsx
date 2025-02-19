import FacebookIcon from '@assets/icons/facebook-icon.webp';
import InstagramIcon from '@assets/icons/instagram-icon.webp';
import OrchiIcon from '@assets/icons/orchi-icon.webp';
import RaffaeleValentiIcon from '@assets/icons/raffaele-valenti-icon.webp';
import { appsettings } from '@config/appsettings';
import React from 'react';
import { Link } from 'react-router-dom';

import './footer.sass';

import { CopyrightLink } from './copyright-link';
import { SocialLink } from './social-link';

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
    ({ ...props }, ref) => {
        return (
            <div className="footer-container" ref={ref} {...props}>
                <div className="footer-box">
                    <div className="footer-copyright">
                        © 2024-2025 {appsettings.WEBSITE_DEFAULT_AUTHOR}. Tutti
                        i diritti riservati.
                        <div className="footer-link">
                            <span>
                                <Link to="/privacy-policy">
                                    Informativa sulla privacy
                                </Link>
                            </span>

                            <span>
                                <Link to="/contact-us">Fai una prova</Link>
                            </span>

                            <span>
                                <Link to="/faq">FAQ</Link>
                            </span>
                        </div>
                    </div>

                    <div className="footer-credits">
                        <CopyrightLink
                            alt="raffaele-valenti-icon"
                            image={RaffaeleValentiIcon}
                            to="https://www.raffaelevalenti.it"
                        />

                        <span>X</span>

                        <CopyrightLink
                            alt="orchi-icon"
                            image={OrchiIcon}
                            to="/"
                        />
                    </div>

                    <div className="footer-social">
                        <SocialLink
                            alt="facebook-icon"
                            image={FacebookIcon}
                            to="https://www.facebook.com/orchitrieste/"
                        />

                        <SocialLink
                            alt="instagram-icon"
                            image={InstagramIcon}
                            to="https://www.instagram.com/orchisoftair_official/"
                        />
                    </div>
                </div>
            </div>
        );
    },
);
Footer.displayName = 'Footer';

export type { FooterProps };
export default Footer;
