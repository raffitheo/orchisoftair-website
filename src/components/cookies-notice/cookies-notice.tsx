import appsettings from '@config/appsettings';
import React from 'react';

import './cookies-notice.sass';

interface CookiesNoticeProps extends React.HTMLAttributes<HTMLDivElement> {}

const CookiesNotice = React.forwardRef<HTMLDivElement, CookiesNoticeProps>(
    ({ ...props }, ref) => {
        const [showCookiesNotice, setShowCookiesNotice] =
            React.useState<boolean>(true);

        React.useEffect(() => {
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
                <div className="cookies-notice-container" ref={ref} {...props}>
                    <div className="cookies-notice-text">
                        <span>
                            Utilizziamo i cookie per migliorare la tua
                            esperienza di navigazione. Continuando a visitare
                            questo sito, acconsenti al loro uso.
                            <br />
                            <a href="/cookies-policy">Informativa sui cookie</a>
                        </span>
                    </div>

                    <div
                        className="cookies-notice-button"
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
        }
    },
);
CookiesNotice.displayName = 'CookiesNotice';

export type { CookiesNoticeProps };
export default CookiesNotice;
