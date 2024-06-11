import { HTMLAttributes, forwardRef } from 'react';

export interface CopyrightLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    href: string;
    src: string;
}

const CopyrightLink = forwardRef<HTMLAnchorElement, CopyrightLinkProps>(
    ({ alt, href, src, ...props }, ref) => {
        return (
            <a
                aria-label={alt}
                href={href}
                ref={ref}
                target="_blank"
                {...props}
            >
                <div className="copyright-link">
                    <img height={45} src={src} width={45} />
                </div>
            </a>
        );
    },
);
CopyrightLink.displayName = 'CopyrightLink';

export default CopyrightLink;
