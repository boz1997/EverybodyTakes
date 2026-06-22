import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from GitHub Pages with custom domain go.guestcam.store.
// With a custom domain, the root of the domain maps to docs/ directly,
// so assets are at /app/assets/ — NOT /EverybodyTakes/app/assets/.
// The app uses only a ?code= query param — no client-side routing — so a plain
// static host works without SPA rewrites.
export default defineConfig({
  base: '/app/',
  plugins: [react()],
  build: { outDir: '../docs/app', emptyOutDir: true },
});
