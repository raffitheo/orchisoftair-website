import Navbar from '@components/navbar';
import Home from '@pages/home';
import NewsAndEvent from '@pages/news-amd-events';
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
                <Route element={<NewsAndEvent />} path="/news/*" />
                <Route element={<NewsAndEvent />} path="/event/*" />
                <Route element={<NotFound />} path="/*" />
            </Routes>
        </Router>
    );
};

export default App;
