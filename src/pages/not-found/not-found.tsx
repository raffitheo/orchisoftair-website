import { HTMLAttributes, forwardRef } from 'react';
import { Helmet } from 'react-helmet';

import './not-found.sass';

export interface NotFoundProps extends HTMLAttributes<HTMLDivElement> {}

const NotFound = forwardRef<HTMLDivElement, NotFoundProps>(({ ...props }, ref) => {
    return (
        <>
            <Helmet>
                <title>A.S.D. Gli Orchi Trieste - Softair Team | Errore 404</title>

                <meta name="title" content="A.S.D. Gli Orchi Trieste - Softair Team | Errore 404" />

                <meta property="og:title" content="A.S.D. Gli Orchi Trieste - Softair Team | Errore 404" />

                <meta property="twitter:title" content="A.S.D. Gli Orchi Trieste - Softair Team | Errore 404" />
            </Helmet>

            <div className="not-found-container" ref={ref} {...props}>
                <div className="not-found-line">
                    <h1>404</h1>
                    <div className="not-found-line-description">
                        <h2>Questa pagina non è stata trovata.</h2>
                    </div>
                </div>
            </div>
        </>
    );
});
NotFound.displayName = 'NotFound';

export default NotFound;
