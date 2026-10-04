import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      /**
       * Proxy /api/* → Spring Boot backend during local development.
       * In production/K8s the BACKEND_API_URL env var (or nginx) handles this.
       */
      '/api': {
        target: process.env.BACKEND_URL ?? 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path, // keep /api prefix (Spring Boot serves at /api/*)
      },
    },
  },
});
