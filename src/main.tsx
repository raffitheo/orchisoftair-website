import { validateEnv } from '@utils/env';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

import './index.sass';

validateEnv();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />

        <Analytics />
        <SpeedInsights />
    </React.StrictMode>,
);
