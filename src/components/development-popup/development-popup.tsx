import { HTMLAttributes, forwardRef, useState } from 'react';

import './development-popup.sass';

export interface DevelopmentPopupProps extends HTMLAttributes<HTMLDivElement> {}

const DevelopmentPopup = forwardRef<HTMLDivElement, DevelopmentPopupProps>(
    ({ ...props }, ref) => {
        const [showDevelopmentPupup, setShowDevelopmentPupup] =
            useState<boolean>(true);

        if (showDevelopmentPupup) {
            return (
                <div className="development-popup-overlay" ref={ref} {...props}>
                    <div className="development-popup-container">
                        <h1>ATTENZIONE</h1>
                        <span>
                            Questo sito è attualmente ed attivamente in
                            sviluppo. Alcune delle funzionalità potrebbero non
                            essere ancora implementate o potrebbero presentare
                            malfunzionamenti.
                            <br />
                            Per segnalare eventuali problematiche, si prega di
                            contattare lo sviluppatore all'indirizzo{' '}
                            <a href="mailto:raffaele-valenti@protonmail.com">
                                raffaele-valenti@protonmail.com
                            </a>
                            .
                            <br />
                            Grazie per la pazienza e per la comprensione.
                        </span>

                        <div
                            className="development-popup-button"
                            onClick={() => {
                                setShowDevelopmentPupup(false);
                            }}
                        >
                            OK
                        </div>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    },
);
DevelopmentPopup.displayName = 'DevelopmentPopup';

export default DevelopmentPopup;
