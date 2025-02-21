import { CookiesNotice } from '@components/cookies-notice';
import { WelcomeMessagePopup } from '@components/welcome-message-popup';
import env from '@config/env';
import useAppwriteQuery from '@hooks/use-appwrite-query';
import { type WelcomeMessage } from '@interfaces/welcome-message';
import { Query } from 'appwrite';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const About = React.lazy(() => import('@pages/about'));
const ContactUs = React.lazy(() => import('@pages/contact-us'));
const CookiesPolicy = React.lazy(() => import('@pages/cookies-policy'));
const FrequentlyAskedQuestions = React.lazy(() => import('@pages/faq'));
const Home = React.lazy(() => import('@pages/home'));
const NewsDetail = React.lazy(() => import('@pages/news-detail'));
const NewsList = React.lazy(() => import('@pages/news-list'));
const NotFound = React.lazy(() => import('@pages/not-found'));
const PrivacyPolicy = React.lazy(() => import('@pages/privacy-policy'));

const App = () => {
    const [currentMessageShown, setCurrentMessageShown] = React.useState(-1);
    const [welcomeMessagesToShow, setWelcomeMessagesToShow] = React.useState<
        WelcomeMessage[]
    >([]);

    const { data: welcomeMessages, status: welcomeMessagesStatus } =
        useAppwriteQuery<WelcomeMessage>({
            collectionId: env.collections.welcomeMessage,
            queries: [
                Query.select(['content', 'key']),
                Query.equal('display', [true]),
            ],
            transform: (doc) => ({
                content: doc.content,
                key: doc.key,
            }),
        });

    React.useEffect(() => {
        if (welcomeMessagesStatus === 'success' && welcomeMessages.length > 0) {
            const newWelcomeMessagesToShow: WelcomeMessage[] = [];
            welcomeMessages.forEach((welcomeMessage) => {
                if (
                    !window.localStorage.getItem(welcomeMessage.key) ||
                    window.localStorage.getItem(welcomeMessage.key) === 'false'
                )
                    newWelcomeMessagesToShow.push(welcomeMessage);
            });

            if (newWelcomeMessagesToShow.length > 0) setCurrentMessageShown(0);
            setWelcomeMessagesToShow(newWelcomeMessagesToShow);
        }
    }, [welcomeMessagesStatus, welcomeMessages]);

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    {route(<Home />, '/')}
                    {route(<About />, '/about')}
                    {route(<NewsList />, '/news')}
                    {route(<ContactUs />, '/contact-us')}
                    {route(<NewsDetail />, '/news/*')}
                    {route(<NewsDetail />, '/event/*')}
                    {route(<CookiesPolicy />, '/cookies-policy')}
                    {route(<PrivacyPolicy />, '/privacy-policy')}
                    {route(<FrequentlyAskedQuestions />, '/faq')}
                    {route(<NotFound />, '/*')}
                </Routes>

                <CookiesNotice />

                {welcomeMessagesToShow.length >= 1 &&
                    currentMessageShown != -1 && (
                        <WelcomeMessagePopup
                            content={
                                welcomeMessagesToShow[currentMessageShown]
                                    .content
                            }
                            onClick={() => {
                                window.localStorage.setItem(
                                    welcomeMessagesToShow[currentMessageShown]
                                        .key,
                                    'true',
                                );
                                if (
                                    currentMessageShown >=
                                    welcomeMessagesToShow.length - 1
                                )
                                    setCurrentMessageShown(-1);
                                else
                                    setCurrentMessageShown(
                                        currentMessageShown + 1,
                                    );
                            }}
                        />
                    )}
            </Router>
        </React.Fragment>
    );

    function route(element: React.ReactNode, path: string) {
        return (
            <Route
                element={<React.Suspense>{element}</React.Suspense>}
                path={path}
            />
        );
    }
};

export default App;
