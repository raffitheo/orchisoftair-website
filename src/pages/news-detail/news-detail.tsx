import LorePattern from '@assets/lore-pattern.webp';
import { Footer } from '@components/footer';
import { appsettings } from '@config/appsettings';
import { databases } from '@config/appwrite';
import { type DataStatus } from '@interfaces/data-status';
import { type Page } from '@interfaces/page';
import NotFound from '@pages/not-found';
import { Query } from 'appwrite';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';

import './news-detail.sass';

const PAGE_TITLE = (title: string) =>
    `${appsettings.WEBSITE_DEFAULT_TITLE} | ${title}`;

interface NewsDetailProps extends React.HTMLAttributes<HTMLDivElement> {}

const NewsDetail = React.forwardRef<HTMLDivElement, NewsDetailProps>(
    ({ ...props }, ref) => {
        const location = useLocation();

        const [pageData, setPageData] = React.useState<Page>();
        const [pageDataStatus, setPageDataStatus] =
            React.useState<DataStatus>('initialized');

        React.useEffect(() => {
            setPageDataStatus('loading');
        }, []);

        React.useEffect(() => {
            if (pageDataStatus === 'loading') {
                getContent();
            }
        }, [pageDataStatus]);

        return (
            <div ref={ref} {...props}>
                {renderPage()}
            </div>
        );

        function renderPage() {
            switch (pageDataStatus) {
                case 'error':
                case 'error-no-data':
                    return <NotFound />;

                case 'initialized':
                case 'loading':
                    return (
                        <Helmet>
                            <title>Caricamento in corso...</title>
                        </Helmet>
                    );

                case 'success':
                    return (
                        <React.Fragment>
                            <Helmet>
                                <title>
                                    {PAGE_TITLE(pageData?.title as string)}
                                </title>

                                <meta
                                    name="author"
                                    content={appsettings.WEBSITE_DEFAULT_AUTHOR}
                                />
                                <meta
                                    name="description"
                                    content={
                                        appsettings.WEBSITE_DEFAULT_DESCRIPTION
                                    }
                                />
                                <meta
                                    name="title"
                                    content={PAGE_TITLE(
                                        pageData?.title as string,
                                    )}
                                />

                                <meta
                                    property="og:description"
                                    content={
                                        appsettings.WEBSITE_DEFAULT_DESCRIPTION
                                    }
                                />
                                <meta
                                    property="og:title"
                                    content={PAGE_TITLE(
                                        pageData?.title as string,
                                    )}
                                />

                                <meta
                                    property="twitter:description"
                                    content={
                                        appsettings.WEBSITE_DEFAULT_DESCRIPTION
                                    }
                                />
                                <meta
                                    property="twitter:title"
                                    content={PAGE_TITLE(
                                        pageData?.title as string,
                                    )}
                                />
                            </Helmet>

                            <div className="news-container">
                                <div
                                    className="news-header-box2"
                                    style={{
                                        backgroundImage: `url(${pageData?.headerImage})`,
                                    }}
                                >
                                    <div className="news-banner-box">
                                        <div className="news-header">
                                            <div className="back-button">
                                                <Link to="/">
                                                    Torna alla home
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="news-header-banner">
                                            <div>
                                                <h1>
                                                    {pageData
                                                        ? pageData.title
                                                        : ''}
                                                </h1>
                                                <div className="banner-date">
                                                    {pageData &&
                                                    pageData.creationDate
                                                        ? formatDate(
                                                              pageData.creationDate,
                                                          )
                                                        : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="video-gradient" />

                                <div
                                    className="news-main-container"
                                    style={{
                                        background: `url(${LorePattern}) no-repeat 50%`,
                                    }}
                                >
                                    <div className="news-main-box">
                                        {pageData &&
                                            pageData.content &&
                                            parse(pageData.content)}
                                        <div className="content-creators"></div>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </React.Fragment>
                    );
            }
        }

        async function getContent() {
            const response = await databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_NEWS_COLLECTION_ID,
                [
                    Query.select([
                        'content',
                        'creationDate',
                        'headerImage',
                        'redirectLink',
                        'title',
                    ]),
                    Query.equal('redirectLink', [location.pathname]),
                    Query.limit(1),
                ],
            );

            if (response) {
                if (response.documents.length >= 1) {
                    setPageDataStatus('success');
                    setPageData({
                        content: response.documents[0].content,
                        creationDate: response.documents[0].creationDate,
                        headerImage: response.documents[0].headerImage,
                        title: response.documents[0].title,
                    });
                } else {
                    setPageDataStatus('error-no-data');
                }
            } else {
                setPageDataStatus('error');
            }
        }

        function formatDate(date: Date) {
            const newDate = dayjs(date);
            const months = [
                'gennaio',
                'febbraio',
                'marzo',
                'aprile',
                'maggio',
                'giugno',
                'luglio',
                'agosto',
                'settembre',
                'ottobre',
                'novembre',
                'dicembre',
            ];

            const day = newDate.date();
            const month = months[newDate.month()];
            const year = newDate.year();

            return `${day} ${month} ${year}`;
        }
    },
);
NewsDetail.displayName = 'NewsDetail';

export type { NewsDetailProps };
export default NewsDetail;
