import React from 'react';
import { Link } from 'react-router-dom';

interface CopyrightLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    alt: string;
    image: string;
    to: string;
}

const CopyrightLink = React.forwardRef<HTMLAnchorElement, CopyrightLinkProps>(
    ({ alt, to, image, ...props }, ref) => {
        return (
            <Link aria-label={alt} ref={ref} target="_blank" to={to} {...props}>
                <div className="copyright-link">
                    <img
                        alt={alt}
                        height={45}
                        loading="lazy"
                        src={image}
                        width={45}
                    />
                </div>
            </Link>
        );
    },
);
CopyrightLink.displayName = 'CopyrightLink';

export type { CopyrightLinkProps };
export default CopyrightLink;
