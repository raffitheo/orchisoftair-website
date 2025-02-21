import React from 'react';
import { Link } from 'react-router-dom';

import './news-carousel-element.sass';

interface NewsCarouselElementProps
    extends React.HTMLAttributes<HTMLDivElement> {
    category?: string;
    isLoading?: boolean;
    thumbnail?: string;
    title?: string;
    to: string;
}

const NewsCarouselElement = React.forwardRef<
    HTMLDivElement,
    NewsCarouselElementProps
>(({ category, className, isLoading, thumbnail, title, to, ...props }, ref) => {
    return (
        <div
            className={`news-item${className ? ` ${className}` : ''}`}
            ref={ref}
            {...props}
        >
            {isLoading ? (
                <React.Fragment>
                    <div className="center">
                        <div className="spinner"></div>
                    </div>

                    <div className="blur news-item-description">
                        <h3>Titolo della news</h3>
                        <p>Caricamento #0</p>
                        <Link className="news-item-link" to={to}>
                            SCOPRI DI PIÙ →
                        </Link>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Link to={to}>
                        <img
                            alt="news-thumbnail"
                            loading="lazy"
                            src={thumbnail}
                        />
                    </Link>
                    <div className="news-item-description">
                        <h3>{title}</h3>
                        <p>{category}</p>
                        <Link className="news-item-link" to={to}>
                            SCOPRI DI PIÙ →
                        </Link>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
});
NewsCarouselElement.displayName = 'NewsCarouselElement';

export type { NewsCarouselElementProps };
export default NewsCarouselElement;
