import dayjs from 'dayjs';
import React from 'react';

import './news-list-element.sass';

interface NewsListElementProps extends React.HTMLAttributes<HTMLDivElement> {
    category?: string | undefined;
    creationDate?: Date | undefined;
    isLoading?: boolean | undefined;
    redirectLink?: string | undefined;
    subtitle?: string | undefined;
    thumbnail?: string | undefined;
    title?: string | undefined;
}

const NewsListElement = React.forwardRef<HTMLDivElement, NewsListElementProps>(
    (
        {
            category,
            creationDate,
            isLoading,
            redirectLink,
            subtitle,
            thumbnail,
            title,
            ...props
        },
        ref,
    ) => {
        return (
            <div className="news-element" ref={ref} {...props}>
                {isLoading ? (
                    <React.Fragment>
                        <div className="center">
                            <div className="spinner"></div>
                        </div>

                        <div className="blur">
                            <h2 className="title">Titolo della news</h2>
                            <div className="subtitle">
                                Gli Orchi persentano questa fantastica news...
                                Che è ancora in caricamento, ma tanto la
                                schermata è sfocato e non lo saprai mai
                            </div>
                            <div className="category">Caricamento #0</div>
                            <div className="bottom-line">
                                <a>
                                    <p>Scopri di più →</p>
                                </a>
                                <p>01/01/2024</p>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <a href={redirectLink}>
                            <img height={300} src={thumbnail} width={500} />
                        </a>

                        <h2 className="title">{title}</h2>
                        <div className="subtitle">{subtitle}</div>
                        <div className="category">{category}</div>
                        <div className="bottom-line">
                            <a href={redirectLink}>
                                <p>Scopri di più →</p>
                            </a>
                            <p>
                                {creationDate
                                    ? dayjs(creationDate).format('DD/MM/YYYY')
                                    : ''}
                            </p>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    },
);
NewsListElement.displayName = 'NewsListElement';

export type { NewsListElementProps };
export default NewsListElement;
