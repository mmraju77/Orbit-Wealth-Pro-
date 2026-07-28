import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    appType: 'spa',
    build: {
      target: 'esnext',
      outDir: 'dist',
      emptyOutDir: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-core': ['react'],
            'react-dom': ['react-dom'],
            'react-router': ['react-router-dom'],
            'recharts': ['recharts'],
            'motion': ['motion']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
