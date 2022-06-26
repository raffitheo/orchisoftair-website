import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { OrchiWebsite } from './components/OrchiWebsite';

import reportWebVitals from './reportWebVitals';

import GlobalCSS from './styles/global.style';
import { defaultTheme } from './styles/defaultTheme.style';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeProvider
            theme={defaultTheme}
        >
            <GlobalCSS />
            <OrchiWebsite />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
