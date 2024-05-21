import { HTMLAttributes, forwardRef } from 'react';

import './footer.css';

import FacebookIcon from '../../assets/facebook-icon.webp';
import InstagramIcon from '../../assets/instagram-icon.webp';
import OrchiIcon from '../../assets/orchi-icon.webp';
import RaffaeleValentiIcon from '../../assets/raffaele-valenti-icon.webp';

interface SocialItemProps extends HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    href: string;
    src: string;
}

const SocialItem = forwardRef<HTMLAnchorElement, SocialItemProps>(
    ({ alt, href, src, ...props }, ref) => {
        return (
            <a
                aria-label={alt}
                className="footer-social-item"
                href={href}
                ref={ref}
                target="_blank"
                {...props}
            >
                <img alt={alt} height={32} src={src} width={32} />
            </a>
        );
    },
);

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ ...props }, ref) => {
    return (
        <div className="footer" ref={ref} {...props}>
            <div className="footer-box">
                <div className="footer-copyright">
                    Tutti i diritti riservati. Raffaele Valenti e A.S.D. GLI
                    ORCHI SOFTAIR
                    <div className="footer-link">
                        <span>
                            <a href="/privacy-policy">
                                Informativa sulla privacy
                            </a>
                        </span>
                        <span>
                            <a href="/contact-us">Unisciti a noi</a>
                        </span>
                        <span>
                            <a href="/faq">FAQ</a>
                        </span>
                    </div>
                </div>

                <div className="footer-credits">
                    <a
                        href="https://raffitheo.github.io/portfolio/"
                        target="_blank"
                    >
                        <div className="rv">
                            <img
                                height={45}
                                src={RaffaeleValentiIcon}
                                width={45}
                            />
                        </div>
                    </a>
                    <span>X</span>
                    <a href="/">
                        <div className="orchi">
                            <img height={45} src={OrchiIcon} width={45} />
                        </div>
                    </a>
                </div>

                <div className="footer-social">
                    <SocialItem
                        alt="Facebook"
                        href="https://www.facebook.com/orchitrieste/"
                        src={FacebookIcon}
                    />
                    <SocialItem
                        alt="instagram"
                        href="https://www.instagram.com/orchisoftair_official/"
                        src={InstagramIcon}
                    />
                </div>
            </div>
        </div>
    );
});

export default Footer;
