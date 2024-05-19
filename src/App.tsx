import NotFound from '@pages/not-found';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<NotFound />} path="/*" />
            </Routes>
        </Router>
    );
};

export default App;
