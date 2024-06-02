import { StrictMode, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import './index.sass';

const App = lazy(() => import('./app.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
