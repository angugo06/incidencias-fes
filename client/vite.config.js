// Vite: en desarrollo reenvía /api al servidor Express (puerto 3001).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { '/api': 'http://localhost:3001' } },
  test: { environment: 'jsdom', setupFiles: './src/pruebas.setup.js', globals: true },
});
