import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'booktrail-256.webp',
        'booktrail-512.png',
        'booktrail-1024.png',
        'booktrail-transparent-256.webp',
        'booktrail-transparent-1024.png',
        'manifest.webmanifest',
      ],
      manifest: {
        name: 'BookTrail',
        short_name: 'BookTrail',
        description: 'Gestor de libros y colecciones',
        theme_color: '#d3dfd3',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'booktrail-256.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
          {
            src: 'booktrail-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'booktrail-1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
          {
            src: 'booktrail-transparent-256.webp',
            sizes: '256x256',
            type: 'image/webp',
            purpose: 'maskable',
          },
          {
            src: 'booktrail-transparent-1024.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '160x180',
            type: 'image/png',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
