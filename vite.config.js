import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js'
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
            overlay: false, // Disable error overlay
        },
        watch: {
            usePolling: true,
            interval: 3000,
            ignored: ['**/node_modules/**', '**/vendor/**'],
        },
    },
    // Add this to reduce work
    optimizeDeps: {
        exclude: ['vue'], // Don't pre-bundle Vue
    },
});