import { HTMLAttributes, forwardRef } from 'react';

import './news-carousel-element.sass';

export interface NewsCarouselElementProps
    extends HTMLAttributes<HTMLDivElement> {
    category: string;
    href: string;
    src: string;
    title: string;
}

const NewsCarouselElement = forwardRef<
    HTMLDivElement,
    NewsCarouselElementProps
>(({ category, href, src, title, ...props }, ref) => {
    return (
        <div className="news-item" ref={ref} {...props}>
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
        </div>
    );
});
NewsCarouselElement.displayName = 'NewsCarouselElement';

export default NewsCarouselElement;
