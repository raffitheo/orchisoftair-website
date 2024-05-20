import Navbar from '@components/navbar';
import Home from '@pages/home';
import NewsDetail from '@pages/news-detail';
import NotFound from '@pages/not-found';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                    path="/"
                />
                <Route element={<NewsDetail />} path="/news/*" />
                <Route element={<NewsDetail />} path="/event/*" />
                <Route element={<NotFound />} path="/*" />
            </Routes>
        </Router>
    );
};

export default App;
