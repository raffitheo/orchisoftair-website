import React from 'react';
import { Link } from 'react-router-dom';

import './social-link.sass';

interface SocialLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    src: string;
    to: string;
}

const SocialLink = React.forwardRef<HTMLAnchorElement, SocialLinkProps>(
    ({ alt, to, src, ...props }, ref) => {
        return (
            <Link
                aria-label={alt}
                className="social-link-element"
                ref={ref}
                target="_blank"
                to={to}
                {...props}
            >
                <img alt={alt} height={32} src={src} width={32} />
            </Link>
        );
    },
);
SocialLink.displayName = 'SocialLink';

export type { SocialLinkProps };
export default SocialLink;
