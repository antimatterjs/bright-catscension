import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true
  },

  resolve: {
    alias: {
      '@': '/src'
    }
  },

  test: {
    environment: 'jsdom',
    globals: true,
    testMatch: ['**/*.test.ts?(x)'],
    setupFiles: ['./src/testing/setupTests.ts']
  }
});
