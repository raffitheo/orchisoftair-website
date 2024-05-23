import CookiesNotice from '@components/cookies-notice';
import DevelopmentPopup from '@components/development-popup';
import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const CookiesPolicy = lazy(() => import('@pages/cookies-policy'));
const Home = lazy(() => import('@pages/home'));
const NewsDetail = lazy(() => import('@pages/news-detail'));
const NewsList = lazy(() => import('@pages/news-list'));
const NotFound = lazy(() => import('@pages/not-found'));
const PrivacyPolicy = lazy(() => import('@pages/privacy-policy'));

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<NewsList />} path="/news" />

                <Route element={<NewsDetail />} path="/news/*" />
                <Route element={<NewsDetail />} path="/event/*" />

                <Route element={<CookiesPolicy />} path="/cookies-policy" />
                <Route element={<PrivacyPolicy />} path="/privacy-policy" />

                <Route element={<NotFound />} path="/*" />
            </Routes>

            <CookiesNotice />
            <DevelopmentPopup />
        </Router>
    );
};

export default App;
