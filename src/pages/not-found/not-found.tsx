import { HTMLAttributes, forwardRef } from 'react';

import './not-found.sass';

export interface NotFoundProps extends HTMLAttributes<HTMLDivElement> {}

const NotFound = forwardRef<HTMLDivElement, NotFoundProps>(
    ({ ...props }, ref) => {
        return (
            <div className="not-found-container" ref={ref} {...props}>
                <div className="not-found-line">
                    <h1>404</h1>
                    <div className="not-found-line-description">
                        <h2>Questa pagina non è stata trovata.</h2>
                    </div>
                </div>
            </div>
        );
    },
);
NotFound.displayName = 'NotFound';

export default NotFound;
