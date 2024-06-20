import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.sass';

const App = React.lazy(() => import('./app.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
