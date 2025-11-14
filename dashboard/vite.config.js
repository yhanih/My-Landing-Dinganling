import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/dashboard/',
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'SUPABASE_', 'NEXT_PUBLIC_'],
  server: {
    host: '0.0.0.0',
    port: 5001,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    outDir: '../dist-dashboard',
    emptyOutDir: true,
  },
});
