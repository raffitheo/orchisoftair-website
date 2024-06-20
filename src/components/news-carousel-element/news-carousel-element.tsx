import React from 'react';

import './news-carousel-element.sass';

interface NewsCarouselElementProps
    extends React.HTMLAttributes<HTMLDivElement> {
    category?: string | undefined;
    href?: string | undefined;
    isLoading?: boolean | undefined;
    src?: string | undefined;
    title?: string | undefined;
}

const NewsCarouselElement = React.forwardRef<
    HTMLDivElement,
    NewsCarouselElementProps
>(({ category, href, isLoading, src, title, ...props }, ref) => {
    return (
        <div className="news-item" ref={ref} {...props}>
            {isLoading ? (
                <React.Fragment>
                    <div className="center">
                        <div className="spinner"></div>
                    </div>

                    <div className="blur news-item-description">
                        <h3>Titolo della news</h3>
                        <p>Caricamento #0</p>
                        <a className="news-item-link" href={href}>
                            SCOPRI DI PIÙ →
                        </a>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <a href={href}>
                        <img alt="news" src={src} />
                    </a>
                    <div className="news-item-description">
                        <h3>{title}</h3>
                        <p>{category}</p>
                        <a className="news-item-link" href={href}>
                            SCOPRI DI PIÙ →
                        </a>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
});
NewsCarouselElement.displayName = 'NewsCarouselElement';

export type { NewsCarouselElementProps };
export default NewsCarouselElement;
