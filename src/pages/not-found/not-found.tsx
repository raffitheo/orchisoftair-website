import { SEO } from '@components/seo';
import React from 'react';

import './not-found.sass';

interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotFound = React.forwardRef<HTMLDivElement, NotFoundProps>(
    ({ className, ...props }, ref) => {
        return (
            <React.Fragment>
                <SEO title="Errore 404" />

                <div
                    className={`not-found${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <div className="not-found-line">
                        <h1>404</h1>
                        <div className="not-found-line-description">
                            <h2>Questa pagina non è stata trovata.</h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    },
);
NotFound.displayName = 'NotFound';

export type { NotFoundProps };
export default NotFound;
