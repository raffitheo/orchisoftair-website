import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: 'localhost',
        port: 5173,
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
});
