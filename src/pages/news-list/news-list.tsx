import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { NewsListElement } from '@components/news-list-element';
import { appsettings } from '@config/appsettings';
import { databases } from '@config/appwrite';
import { type DataStatus } from '@interfaces/data-status';
import { type News } from '@interfaces/news';
import { Query } from 'appwrite';
import React from 'react';
import { Helmet } from 'react-helmet';

import './news-list.sass';

const PAGE_TITLE = `${appsettings.WEBSITE_DEFAULT_TITLE} | Novità ed eventi`;

interface NewsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const NewsList = React.forwardRef<HTMLDivElement, NewsListProps>(
    ({ ...props }, ref) => {
        const [newsList, setNwsList] = React.useState<News[]>([]);
        const [newsListStatus, setNwsListStatus] =
            React.useState<DataStatus>('initialized');

        React.useEffect(() => {
            setNwsListStatus('loading');
        }, []);

        React.useEffect(() => {
            if (newsListStatus === 'loading') {
                getNews();
            }
        }, [newsListStatus]);

        return (
            <React.Fragment>
                <Helmet>
                    <title>{PAGE_TITLE}</title>

                    <meta
                        name="author"
                        content={appsettings.WEBSITE_DEFAULT_AUTHOR}
                    />
                    <meta
                        name="description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta name="title" content={PAGE_TITLE} />

                    <meta
                        property="og:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="og:title" content={PAGE_TITLE} />

                    <meta
                        property="twitter:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="twitter:title" content={PAGE_TITLE} />
                </Helmet>

                <div ref={ref} {...props}>
                    <Navbar active="news" />

                    <div className="news-container">
                        <div className="news-header-box2">
                            <div className="news-banner-box">
                                <div className="news-header-banner">
                                    <div className="news-header" />

                                    <div>
                                        <h1>NOVITÀ ED EVENTI</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="news-background">
                            {renderNewsList()}
                        </div>
                    </div>

                    <Footer />
                </div>
            </React.Fragment>
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
                            <NewsListElement isLoading redirectLink="#" />
                            <NewsListElement isLoading redirectLink="#" />
                            <NewsListElement isLoading redirectLink="#" />
                            <NewsListElement isLoading redirectLink="#" />
                            <NewsListElement isLoading redirectLink="#" />
                            <NewsListElement isLoading redirectLink="#" />
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

export type { NewsListProps };
export default NewsList;
