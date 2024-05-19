import Navbar from '@components/navbar';
import Home from '@pages/home';
import NewsAndEvents from '@pages/news-amd-events';
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
                <Route element={<NewsAndEvents />} path="/news/*" />
                <Route element={<NewsAndEvents />} path="/event/*" />
                <Route element={<NotFound />} path="/*" />
            </Routes>
        </Router>
    );
};

export default App;
