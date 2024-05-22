import appsettings from '@config/appsettings';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import './cookies-notice.css';

export interface CookiesNoticeProps extends HTMLAttributes<HTMLDivElement> {}

const CookiesNotice = forwardRef<HTMLDivElement, CookiesNoticeProps>(
    ({ ...props }, ref) => {
        const [showCookiesNotice, setShowCookiesNotice] =
            useState<boolean>(true);

        useEffect(() => {
            const storageValue = window.localStorage.getItem(
                appsettings.COOKIES_NOTICE_ACCEPTED,
            );

            if (!storageValue) {
                window.localStorage.setItem(
                    appsettings.COOKIES_NOTICE_ACCEPTED,
                    'false',
                );
            }

            if (!storageValue || storageValue === 'false') {
                setShowCookiesNotice(true);
            } else {
                setShowCookiesNotice(false);
            }
        }, []);

        if (showCookiesNotice) {
            return (
                <div className="cookies-container" ref={ref} {...props}>
                    <div className="text">
                        <span>
                            Utilizziamo i cookie per migliorare la tua
                            esperienza di navigazione. Continuando a visitare
                            questo sito, acconsenti al loro uso.{' '}
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
