import Footer from '@components/footer';
import Navbar from '@components/navbar';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import News from '@interfaces/news';
import { Query } from 'appwrite';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import './news-list.css';

interface NewsListElementProps extends HTMLAttributes<HTMLDivElement> {
    category?: string;
    creationDate?: Date;
    isLoading?: boolean;
    redirectLink?: string;
    subtitle?: string;
    thumbnail?: string;
    title?: string;
}

const NewsListElement = forwardRef<HTMLDivElement, NewsListElementProps>(
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
            <div className="news-item" ref={ref} {...props}>
                {isLoading ? (
                    <>
                        <div className="center">
                            <div className="spinner"></div>
                        </div>

                        <div className="blur">
                            <h2 className="title">Titolo della news</h2>
                            <div className="description">
                                Gli Orchi persentano questa fantastica news...
                                Che è ancora in caricamento, ma tanto la
                                schermata è sfocato e non lo saprai mai
                            </div>
                            <div className="tag">Caricamento #0</div>
                            <div className="bottom-line">
                                <a>
                                    <p>Scopri di più →</p>
                                </a>
                                <p>01/01/2024</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <a href={redirectLink}>
                            <img height={300} src={thumbnail} width={500} />
                        </a>

                        <h2 className="title">{title}</h2>
                        <div className="description">{subtitle}</div>
                        <div className="tag">{category}</div>
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
                    </>
                )}
            </div>
        );
    },
);

export interface NewsListProps extends HTMLAttributes<HTMLDivElement> {}

const NewsList = forwardRef<HTMLDivElement, NewsListProps>(
    ({ ...props }, ref) => {
        const [newsList, setNwsList] = useState<Array<News>>([]);
        const [newsListStatus, setNwsListStatus] =
            useState<DataStatus>('initialized');

        useEffect(() => {
            setNwsListStatus('loading');
        }, []);

        useEffect(() => {
            if (newsListStatus === 'loading') {
                getNews();
            }
        }, [newsListStatus]);

        return (
            <div className="news" ref={ref} {...props}>
                <Navbar active="news" />

                <div className="news-bg">
                    <div className="gallery">
                        {newsList && newsList.length >= 1 ? (
                            <>
                                {newsList.map((news, newsIndex) => (
                                    <NewsListElement
                                        category={news.category}
                                        creationDate={news.creationDate}
                                        redirectLink={news.redirectLink}
                                        key={newsIndex}
                                        subtitle={news.subtitle}
                                        thumbnail={news.thumbnail}
                                        title={news.title}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <NewsListElement isLoading />
                                <NewsListElement isLoading />
                                <NewsListElement isLoading />
                                <NewsListElement isLoading />
                                <NewsListElement isLoading />
                                <NewsListElement isLoading />
                            </>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        );

        async function getNews() {
            const response = await databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_NEWS_COLLECTION_ID,
                [
                    Query.select([
                        'category',
                        'creationDate',
                        '$id',
                        'redirectLink',
                        'subtitle',
                        'thumbnail',
                        'title',
                    ]),
                    Query.equal('display', [true]),
                    Query.orderDesc('creationDate'),
                ],
            );

            if (response) {
                setNwsListStatus('success');

                const newsListResponse: Array<News> = [];

                response.documents.forEach((documnet) => {
                    newsListResponse.push({
                        category: documnet.category,
                        creationDate: new Date(documnet.creationDate),
                        id: documnet.$id,
                        redirectLink: documnet.redirectLink,
                        subtitle: documnet.subtitle,
                        thumbnail: documnet.thumbnail,
                        title: documnet.title,
                    });
                });

                setNwsList(newsListResponse);
            } else {
                setNwsListStatus('error');
            }
        }
    },
);

export default NewsList;
