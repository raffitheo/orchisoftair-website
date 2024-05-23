import Footer from '@components/footer';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import Page, { Content } from '@interfaces/page';
import NotFound from '@pages/not-found';
import { Query } from 'appwrite';
import dayjs from 'dayjs';
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

        switch (pageDataStatus) {
            case 'error':
            case 'error-no-data':
                return <NotFound />;

            case 'success':
                return (
                    <div ref={ref} {...props}>
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
                                            <a href="/">Torna indietro</a>
                                        </div>
                                    </div>

                                    <div className="news-header-banner">
                                        <div>
                                            <h1>
                                                {pageData ? pageData.title : ''}
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
                                        pageData.content.map(
                                            (element, elementIndex) => {
                                                switch (element.type) {
                                                    case 'a':
                                                    case 'h3':
                                                    case 'none':
                                                    case 'p':
                                                    case 'span':
                                                    case 'ul':
                                                        return renderElement(
                                                            element.type,
                                                            elementIndex,
                                                            element.value,
                                                            element.values,
                                                            element.link,
                                                        );

                                                    default:
                                                        return <></>;
                                                }
                                            },
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    <div className="content-creators"></div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>
                );

            default:
                return <></>;
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

        function renderElement(
            type: 'a' | 'h3' | 'none' | 'p' | 'span' | 'ul',
            index: number,
            value?: string,
            values?: Array<Content>,
            link?: string,
        ): JSX.Element {
            switch (type) {
                case 'a':
                    return (
                        <a href={link ? link : '/'} key={`${type}_${index}`}>
                            {value}
                        </a>
                    );
                case 'h3':
                    return <h3 key={`${type}_${index}`}>{value}</h3>;
                case 'none':
                    return (
                        <>
                            {values ? (
                                values.map((subElement, subElementIndex) => {
                                    switch (subElement.type) {
                                        case 'a':
                                        case 'h3':
                                        case 'none':
                                        case 'p':
                                        case 'span':
                                        case 'ul':
                                            return renderElement(
                                                subElement.type,
                                                subElementIndex,
                                                subElement.value,
                                                subElement.values,
                                                subElement.link,
                                            );

                                        default:
                                            return <></>;
                                    }
                                })
                            ) : (
                                <>
                                    {value}
                                    <br />
                                </>
                            )}
                        </>
                    );
                case 'span':
                    return (
                        <span key={`${type}_${index}`}>
                            {values
                                ? values?.map((subElement, subElementIndex) => {
                                      switch (subElement.type) {
                                          case 'a':
                                          case 'h3':
                                          case 'none':
                                          case 'p':
                                          case 'span':
                                          case 'ul':
                                              return renderElement(
                                                  subElement.type,
                                                  subElementIndex,
                                                  subElement.value,
                                                  subElement.values,
                                                  subElement.link,
                                              );

                                          default:
                                              return <></>;
                                      }
                                  })
                                : value}
                        </span>
                    );
                case 'p':
                    return (
                        <p key={`${type}_${index}`}>
                            {values
                                ? values?.map((subElement, subElementIndex) => {
                                      switch (subElement.type) {
                                          case 'a':
                                          case 'h3':
                                          case 'none':
                                          case 'p':
                                          case 'span':
                                          case 'ul':
                                              return renderElement(
                                                  subElement.type,
                                                  subElementIndex,
                                                  subElement.value,
                                                  subElement.values,
                                                  subElement.link,
                                              );

                                          default:
                                              return <></>;
                                      }
                                  })
                                : value}
                        </p>
                    );
                case 'ul':
                    return (
                        <ul key={`${type}_${index}`}>
                            {values?.map((subElement, subElementIndex) => {
                                switch (subElement.type) {
                                    case 'a':
                                    case 'h3':
                                    case 'none':
                                    case 'p':
                                    case 'span':
                                    case 'ul':
                                        return renderElement(
                                            subElement.type,
                                            subElementIndex,
                                            subElement.value,
                                            subElement.values,
                                            subElement.link,
                                        );

                                    default:
                                        return <></>;
                                }
                            })}
                        </ul>
                    );
            }
        }
    },
);
NewsDetail.displayName = 'NewsDetail';

export default NewsDetail;
