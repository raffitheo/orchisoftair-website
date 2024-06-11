import FacebookIcon from '@assets/icons/facebook-icon.webp';
import InstagramIcon from '@assets/icons/instagram-icon.webp';
import OrchiIcon from '@assets/icons/orchi-icon.webp';
import RaffaeleValentiIcon from '@assets/icons/raffaele-valenti-icon.webp';
import appsettings from '@config/appsettings';
import { HTMLAttributes, forwardRef } from 'react';

import './footer.sass';

import CopyrightLink from './copyright-link';
import SocialLink from './social-link';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ ...props }, ref) => {
    return (
        <div className="footer-container" ref={ref} {...props}>
            <div className="footer-box">
                <div className="footer-copyright">
                    Tutti i diritti riservati.{' '}
                    {appsettings.WEBSITE_DEFAULT_AUTHOR}
                    <div className="footer-link">
                        <span>
                            <a href="/privacy-policy">
                                Informativa sulla privacy
                            </a>
                        </span>
                        <span>
                            <a href="/contact-us">Fai una prova</a>
                        </span>
                        <span>
                            <a href="/faq">FAQ</a>
                        </span>
                    </div>
                </div>

                <div className="footer-credits">
                    <CopyrightLink
                        alt="Raffaele Valenti"
                        href="https://www.raffaelevalenti.it"
                        src={RaffaeleValentiIcon}
                    />
                    <span>X</span>
                    <CopyrightLink alt="Orchi" href="/" src={OrchiIcon} />
                </div>

                <div className="footer-social">
                    <SocialLink
                        alt="Facebook"
                        href="https://www.facebook.com/orchitrieste/"
                        src={FacebookIcon}
                    />
                    <SocialLink
                        alt="instagram"
                        href="https://www.instagram.com/orchisoftair_official/"
                        src={InstagramIcon}
                    />
                </div>
            </div>
        </div>
    );
});
Footer.displayName = 'Footer';

export default Footer;
