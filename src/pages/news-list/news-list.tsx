import Footer from '@components/footer';
import Navbar from '@components/navbar';
import NewsListElement from '@components/news-list-element';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import News from '@interfaces/news';
import { Query } from 'appwrite';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import './news-list.sass';

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
            <div className="news-container" ref={ref} {...props}>
                <Navbar active="news" />

                <div className="news-background">{renderNewsList()}</div>

                <Footer />
            </div>
        );

        function renderNewsList() {
            switch (newsListStatus) {
                case 'error':
                case 'error-no-data':
                    return (
                        <div className="news-empty">
                            <h1>
                                Si è presentato un errore inaspettato. Non è
                                possibile caricare la lista degli elementi.
                            </h1>
                        </div>
                    );

                case 'initialized':
                case 'loading':
                    return (
                        <div className="news-gallery">
                            <NewsListElement isLoading />
                            <NewsListElement isLoading />
                            <NewsListElement isLoading />
                            <NewsListElement isLoading />
                            <NewsListElement isLoading />
                            <NewsListElement isLoading />
                        </div>
                    );

                case 'success':
                    if (newsList.length >= 1) {
                        return (
                            <div className="news-gallery">
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
                            </div>
                        );
                    } else {
                        return (
                            <div className="news-empty">
                                <h1>Non ci sono elementi da visualizzare.</h1>
                            </div>
                        );
                    }
            }
        }

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

                const newsListResponse = response.documents.map((documnet) => {
                    return {
                        category: documnet.category,
                        creationDate: new Date(documnet.creationDate),
                        id: documnet.$id,
                        redirectLink: documnet.redirectLink,
                        subtitle: documnet.subtitle,
                        thumbnail: documnet.thumbnail,
                        title: documnet.title,
                    };
                });

                setNwsList(newsListResponse);
            } else {
                setNwsListStatus('error');
            }
        }
    },
);
NewsList.displayName = 'NewsList';

export default NewsList;
