import { appsettings } from '@config/appsettings';
import React from 'react';
import { Link } from 'react-router-dom';

import './cookies-banner.sass';

type CookiesBannerProps = React.HTMLAttributes<HTMLDivElement>;

const CookiesBanner = React.forwardRef<HTMLDivElement, CookiesBannerProps>(
    ({ className, ...props }, ref) => {
        const [showCookiesNotice, setShowCookiesNotice] = React.useState(true);

        React.useEffect(() => {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith(appsettings.COOKIES_ACCEPTED))
                ?.split('=')[1];

            const sixMonthsInSeconds = 180 * 24 * 60 * 60;

            if (!cookieValue)
                document.cookie = `${appsettings.COOKIES_ACCEPTED}=false; path=/; max-age=${sixMonthsInSeconds}`;

            if (!cookieValue || cookieValue === 'false')
                setShowCookiesNotice(true);
            else setShowCookiesNotice(false);
        }, []);

        if (showCookiesNotice)
            return (
                <div
                    className={`cookies-banner${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <div className="cookies-banner-text">
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
                        className="cookies-banner-button"
                        onClick={() => {
                            setShowCookiesNotice(false);

                            const sixMonthsInSeconds = 180 * 24 * 60 * 60;

                            // eslint-disable-next-line max-len
                            document.cookie = `${appsettings.COOKIES_ACCEPTED}=true; path=/; max-age=${sixMonthsInSeconds}`;
                        }}
                    >
                        OK
                    </div>
                </div>
            );
    },
);
CookiesBanner.displayName = 'CookiesBanner';

export type { CookiesBannerProps };
export default CookiesBanner;
