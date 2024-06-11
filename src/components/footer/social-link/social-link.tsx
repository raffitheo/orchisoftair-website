import { HTMLAttributes, forwardRef } from 'react';

import './social-link.sass';

export interface SocialLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    href: string;
    src: string;
}

const SocialLink = forwardRef<HTMLAnchorElement, SocialLinkProps>(
    ({ alt, href, src, ...props }, ref) => {
        return (
            <a
                aria-label={alt}
                className="social-link-element"
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
SocialLink.displayName = 'SocialLink';

export default SocialLink;
