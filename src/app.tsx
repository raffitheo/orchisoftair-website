import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const Home = lazy(() => import('@pages/home'));
const NewsDetail = lazy(() => import('@pages/news-detail'));
const NewsList = lazy(() => import('@pages/news-list'));
const NotFound = lazy(() => import('@pages/not-found'));

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<NewsList />} path="/news" />

                <Route element={<NewsDetail />} path="/news/*" />
                <Route element={<NewsDetail />} path="/event/*" />

                <Route element={<NotFound />} path="/*" />
            </Routes>
        </Router>
    );
};

export default App;
