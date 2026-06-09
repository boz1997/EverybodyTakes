import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from GitHub Pages under /EverybodyTakes/app/ (built into ../docs/app).
// The app uses only a ?code= query param — no client-side routing — so a plain
// static host works without SPA rewrites.
export default defineConfig({
  base: '/EverybodyTakes/app/',
  plugins: [react()],
  build: { outDir: '../docs/app', emptyOutDir: true },
});
