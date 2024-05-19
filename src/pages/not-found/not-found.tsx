import { HTMLAttributes, forwardRef } from 'react';

import './not-found.css';

export interface NotFoundProps extends HTMLAttributes<HTMLDivElement> {}

const NotFound = forwardRef<HTMLDivElement, NotFoundProps>(
    ({ ...props }, ref) => {
        return (
            <div className="not-found" ref={ref} {...props}>
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

export default NotFound;
