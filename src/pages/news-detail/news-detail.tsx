import Footer from '@components/footer';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import Page from '@interfaces/page';
import NotFound from '@pages/not-found';
import { Query } from 'appwrite';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LorePattern from '../../assets/lore-pattern.webp';

import './news-detail.sass';

export interface NewsDetailProps extends HTMLAttributes<HTMLDivElement> {}

const NewsDetail = forwardRef<HTMLDivElement, NewsDetailProps>(
    ({ ...props }, ref) => {
        const location = useLocation();

        const [pageData, setPageData] = useState<Page | undefined>(undefined);
        const [pageDataStatus, setPageDataStatus] =
            useState<DataStatus>('initialized');

        useEffect(() => {
            setPageDataStatus('loading');
        }, []);

        useEffect(() => {
            if (pageDataStatus === 'loading') {
                getContent();
            }
        }, [pageDataStatus]);

        return (
            <div ref={ref} {...props}>
                {renderPage()}
            </div>
        );

        function renderPage(): JSX.Element {
            switch (pageDataStatus) {
                case 'error':
                case 'error-no-data':
                    return <NotFound />;

                case 'initialized':
                case 'loading':
                    return <></>;

                case 'success':
                    return (
                        <>
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
                                                <a href="/">Torna alla home</a>
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

                                <div
                                    className="news-main-container"
                                    style={{
                                        background: `url(${LorePattern}) no-repeat 50%`,
                                    }}
                                >
                                    <div className="news-main-box">
                                        {pageData && pageData.content ? (
                                            parse(pageData.content)
                                        ) : (
                                            <></>
                                        )}
                                        <div className="content-creators"></div>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </>
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
                        content: JSON.parse(response.documents[0].content),
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

        function formatDate(date: Date): string {
            const newDate = dayjs(date);
            const months: Array<string> = [
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

            const day: number = newDate.date();
            const month: string = months[newDate.month()];
            const year: number = newDate.year();

            return `${day} ${month} ${year}`;
        }
    },
);
NewsDetail.displayName = 'NewsDetail';

export default NewsDetail;
