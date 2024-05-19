import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
});
