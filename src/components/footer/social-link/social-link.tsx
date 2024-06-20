import React from 'react';

import './social-link.sass';

interface SocialLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    href: string;
    src: string;
}

const SocialLink = React.forwardRef<HTMLAnchorElement, SocialLinkProps>(
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

export type { SocialLinkProps };
export default SocialLink;
