import LorePattern from '@assets/lore-pattern.webp';
import { Footer } from '@components/footer';
import { SEO } from '@components/seo';
import env from '@config/env';
import useAppwriteQuery from '@hooks/use-appwrite-query';
import { type Page } from '@interfaces/page';
import NotFound from '@pages/not-found';
import { Query } from 'appwrite';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';

import './news-detail.sass';

interface NewsDetailProps extends React.HTMLAttributes<HTMLDivElement> {}

const NewsDetail = React.forwardRef<HTMLDivElement, NewsDetailProps>(
    ({ className, ...props }, ref) => {
        const location = useLocation();

        const { data: pageDataArray, status: pageDataStatus } =
            useAppwriteQuery<Page>({
                collectionId: env.collections.news,
                queries: [
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
                transform: (doc) => ({
                    content: doc.content,
                    creationDate: new Date(doc.creationDate),
                    headerImage: doc.headerImage,
                    title: doc.title,
                }),
            });

        const pageData = pageDataArray?.[0];

        return renderPage();

        function renderPage() {
            switch (pageDataStatus) {
                case 'error':
                case 'error-no-data':
                    return (
                        <div ref={ref} {...props}>
                            <NotFound />
                        </div>
                    );

                case 'initialized':
                case 'loading':
                    return (
                        <React.Fragment>
                            <Helmet>
                                <title>Caricamento in corso...</title>
                            </Helmet>

                            <div ref={ref} {...props}></div>
                        </React.Fragment>
                    );

                case 'success':
                    return (
                        <React.Fragment>
                            <SEO
                                title={pageData?.title as string}
                                type="article"
                            />

                            <div
                                className={`news-container${className ? ` ${className}` : ''}`}
                                ref={ref}
                                {...props}
                            >
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
