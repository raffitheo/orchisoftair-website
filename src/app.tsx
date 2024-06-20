import CookiesNotice from '@components/cookies-notice';
import WelcomeMessagePopup from '@components/welcome-message-popup';
import appsettings from '@config/appsettings';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import WelcomeMessage from '@interfaces/welcome-message';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Query } from 'appwrite';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const ContactUs = React.lazy(() => import('@pages/contact-us'));
const CookiesPolicy = React.lazy(() => import('@pages/cookies-policy'));
const FrequentlyAskedQuestions = React.lazy(() => import('@pages/faq'));
const Home = React.lazy(() => import('@pages/home'));
const NewsDetail = React.lazy(() => import('@pages/news-detail'));
const NewsList = React.lazy(() => import('@pages/news-list'));
const NotFound = React.lazy(() => import('@pages/not-found'));
const PrivacyPolicy = React.lazy(() => import('@pages/privacy-policy'));

const App = () => {
    const [currentMessageShown, setCurrentMessageShown] =
        React.useState<number>(-1);
    const [welcomeMessages, setWelcomeMessages] = React.useState<
        WelcomeMessage[]
    >([]);
    const [welcomeMessagesStatus, setWelcomeMessagesStatus] =
        React.useState<DataStatus>('initialized');

    React.useEffect(() => {
        const welcomeMessagesClosed = window.sessionStorage.getItem(
            appsettings.WELCOME_MESSAGES_CLOSED,
        );

        if (!welcomeMessagesClosed || welcomeMessagesClosed === 'false') {
            setWelcomeMessagesStatus('loading');
        }
    }, []);

    React.useEffect(() => {
        if (welcomeMessagesStatus === 'loading') {
            getWelcomeMessages();
        }
    }, [welcomeMessagesStatus]);

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<NewsList />} path="/news" />
                    <Route element={<ContactUs />} path="/contact-us" />

                    <Route element={<NewsDetail />} path="/news/*" />
                    <Route element={<NewsDetail />} path="/event/*" />

                    <Route element={<CookiesPolicy />} path="/cookies-policy" />
                    <Route element={<PrivacyPolicy />} path="/privacy-policy" />

                    <Route element={<FrequentlyAskedQuestions />} path="/faq" />

                    <Route element={<NotFound />} path="/*" />
                </Routes>

                <CookiesNotice />

                {welcomeMessages.length >= 1 && currentMessageShown != -1 && (
                    <WelcomeMessagePopup
                        content={welcomeMessages[currentMessageShown].content}
                        onClick={() => {
                            if (
                                currentMessageShown >=
                                welcomeMessages.length - 1
                            ) {
                                setCurrentMessageShown(-1);

                                window.sessionStorage.setItem(
                                    appsettings.WELCOME_MESSAGES_CLOSED,
                                    'true',
                                );
                            } else {
                                setCurrentMessageShown(currentMessageShown + 1);
                            }
                        }}
                    />
                )}
            </Router>

            <Analytics />
            <SpeedInsights />
        </React.Fragment>
    );

    async function getWelcomeMessages() {
        const response = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_WELCOME_MESSAGE_COLLECTION_ID,
            [Query.select(['content']), Query.equal('display', [true])],
        );

        if (response) {
            if (response.documents.length >= 1) {
                setWelcomeMessagesStatus('success');

                const welcomeMessagesResponse = response.documents.map(
                    (documnet) => {
                        return {
                            content: documnet.content,
                        };
                    },
                );

                setWelcomeMessages(welcomeMessagesResponse);
                setCurrentMessageShown(0);
            } else {
                setWelcomeMessagesStatus('error-no-data');

                window.sessionStorage.setItem(
                    appsettings.WELCOME_MESSAGES_CLOSED,
                    'true',
                );
            }
        } else {
            setWelcomeMessagesStatus('error');

            window.sessionStorage.setItem(
                appsettings.WELCOME_MESSAGES_CLOSED,
                'true',
            );
        }
    }
};

export default App;
