import { appsettings } from '@config/appsettings';
import React from 'react';
import { Helmet } from 'react-helmet';

import './not-found.sass';

const PAGE_TITLE = `${appsettings.WEBSITE_DEFAULT_TITLE} | Errore 404`;

interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotFound = React.forwardRef<HTMLDivElement, NotFoundProps>(
    ({ ...props }, ref) => {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{PAGE_TITLE}</title>

                    <meta
                        name="author"
                        content={appsettings.WEBSITE_DEFAULT_AUTHOR}
                    />
                    <meta
                        name="description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta name="title" content={PAGE_TITLE} />

                    <meta
                        property="og:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="og:title" content={PAGE_TITLE} />

                    <meta
                        property="twitter:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="twitter:title" content={PAGE_TITLE} />
                </Helmet>

                <div className="not-found-container" ref={ref} {...props}>
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
