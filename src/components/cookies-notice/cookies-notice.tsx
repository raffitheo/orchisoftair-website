import appsettings from '@config/appsettings';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import './cookies-notice.css';

export interface CookiesNoticeProps extends HTMLAttributes<HTMLDivElement> {}

const CookiesNotice = forwardRef<HTMLDivElement, CookiesNoticeProps>(
    ({ ...props }, ref) => {
        const [showCookiesNotice, setShowCookiesNotice] =
            useState<boolean>(false);

        useEffect(() => {
            const storageValue = window.localStorage.getItem(
                appsettings.COOKIES_NOTICE_ACCEPTED,
            );

            if (!storageValue || storageValue === 'false') {
                setShowCookiesNotice(true);
            }
        }, []);

        if (showCookiesNotice) {
            return (
                <div className="cookies-container" ref={ref} {...props}>
                    <div className="text">
                        <span>
                            Utilizziamo i cookie. Visitando questo sito,
                            accetterai l'uso di cookie predefiniti.{' '}
                            <a href="/cookies-policy">
                                <span>Informativa sui cookie</span>
                            </a>
                        </span>
                    </div>

                    <div
                        className="button"
                        onClick={() => {
                            setShowCookiesNotice(false);
                            window.localStorage.setItem(
                                appsettings.COOKIES_NOTICE_ACCEPTED,
                                'true',
                            );
                        }}
                    >
                        OK
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    },
);

export default CookiesNotice;
