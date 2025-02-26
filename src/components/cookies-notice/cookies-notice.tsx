import { appsettings } from '@config/appsettings';
import React from 'react';
import { Link } from 'react-router-dom';

import './cookies-notice.sass';

type CookiesNoticeProps = React.HTMLAttributes<HTMLDivElement>;

const CookiesNotice = React.forwardRef<HTMLDivElement, CookiesNoticeProps>(
    ({ className, ...props }, ref) => {
        const [showCookiesNotice, setShowCookiesNotice] = React.useState(true);

        React.useEffect(() => {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) =>
                    row.startsWith(appsettings.COOKIES_NOTICE_ACCEPTED),
                )
                ?.split('=')[1];

            const sixMonthsInSeconds = 180 * 24 * 60 * 60;

            if (!cookieValue)
                document.cookie = `${appsettings.COOKIES_NOTICE_ACCEPTED}=false; path=/; max-age=${sixMonthsInSeconds}`;

            if (!cookieValue || cookieValue === 'false')
                setShowCookiesNotice(true);
            else setShowCookiesNotice(false);
        }, []);

        if (showCookiesNotice)
            return (
                <div
                    className={`cookies-notice${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <div className="cookies-notice-text">
                        <span>
                            Utilizziamo i cookies per migliorare la tua
                            esperienza di navigazione. Continuando a visitare
                            questo sito, acconsenti al loro uso.
                            <br />
                            <Link to="/cookies-policy">
                                Informativa sui cookies
                            </Link>
                        </span>
                    </div>

                    <div
                        className="cookies-notice-button"
                        onClick={() => {
                            setShowCookiesNotice(false);

                            const sixMonthsInSeconds = 180 * 24 * 60 * 60;

                            // eslint-disable-next-line max-len
                            document.cookie = `${appsettings.COOKIES_NOTICE_ACCEPTED}=true; path=/; max-age=${sixMonthsInSeconds}`;
                        }}
                    >
                        OK
                    </div>
                </div>
            );
    },
);
CookiesNotice.displayName = 'CookiesNotice';

export type { CookiesNoticeProps };
export default CookiesNotice;
