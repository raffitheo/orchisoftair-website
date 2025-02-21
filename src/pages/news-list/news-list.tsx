import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { NewsListElement } from '@components/news-list-element';
import { SEO } from '@components/seo';
import useAppwriteQuery from '@hooks/use-appwrite-query';
import { type News } from '@interfaces/news';
import { Query } from 'appwrite';
import React from 'react';

import './news-list.sass';

interface NewsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const NewsList = React.forwardRef<HTMLDivElement, NewsListProps>(
    ({ className, ...props }, ref) => {
        const { data: newsList, status: newsListStatus } =
            useAppwriteQuery<News>({
                collectionId: import.meta.env.VITE_NEWS_COLLECTION_ID,
                queries: [
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
                transform: (doc) => ({
                    category: doc.category,
                    creationDate: new Date(doc.creationDate),
                    id: doc.$id,
                    redirectLink: doc.redirectLink,
                    subtitle: doc.subtitle,
                    thumbnail: doc.thumbnail,
                    title: doc.title,
                }),
            });

        return (
            <React.Fragment>
                <SEO title="Novità ed eventi" />

                <div
                    className={`news${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <Navbar active="news" />

                    <div className="news-bg">{renderNewsList()}</div>

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
                        <div className="gallery">
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                            <div>
                                <NewsListElement isLoading redirectLink="#" />
                            </div>
                        </div>
                    );

                case 'success':
                    if (newsList.length >= 1)
                        return (
                            <div className="gallery">
                                {newsList.map((news, newsIndex) => (
                                    <div>
                                        <NewsListElement
                                            category={news.category}
                                            creationDate={news.creationDate}
                                            redirectLink={news.redirectLink}
                                            key={newsIndex}
                                            subtitle={news.subtitle}
                                            thumbnail={news.thumbnail}
                                            title={news.title}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    else
                        return (
                            <div className="news-empty">
                                <h1>Non ci sono elementi da visualizzare.</h1>
                            </div>
                        );
            }
        }
    },
);
NewsList.displayName = 'NewsList';

export type { NewsListProps };
export default NewsList;
