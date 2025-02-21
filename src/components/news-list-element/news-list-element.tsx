import { OptimizedImage } from '@components/optimized-image';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import './news-list-element.sass';

interface NewsListElementProps extends React.HTMLAttributes<HTMLDivElement> {
    category?: string;
    creationDate?: Date;
    isLoading?: boolean;
    redirectLink: string;
    subtitle?: string;
    thumbnail?: string;
    title?: string;
}

const NewsListElement = React.forwardRef<HTMLDivElement, NewsListElementProps>(
    (
        {
            category,
            className,
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
            <div
                className={`news-element${className ? ` ${className}` : ''}`}
                ref={ref}
                {...props}
            >
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
                                <Link to="#">
                                    <p>Scopri di più →</p>
                                </Link>
                                <p>01/01/2024</p>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to={redirectLink}>
                            <OptimizedImage
                                alt="news-thumbnail"
                                height={300}
                                src={thumbnail}
                                width={500}
                            />
                        </Link>

                        <h2 className="title">{title}</h2>
                        <div className="subtitle">{subtitle}</div>
                        <div className="category">{category}</div>
                        <div className="bottom-line">
                            <Link to={redirectLink}>
                                <p>Scopri di più →</p>
                            </Link>

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
