import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      // Inline assets smaller than 4KB to save HTTP requests
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          // Manual chunk splitting — separates heavy libs from core app
          manualChunks: {
            'vendor-react':   ['react', 'react-dom'],
            'vendor-motion':  ['motion/react'],
            'vendor-lucide':  ['lucide-react'],
          },
        },
      },
    },
  };
});
