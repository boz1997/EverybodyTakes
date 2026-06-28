import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Resolve the project's path aliases (mirrors tsconfig.json "paths") so tests can
// import app modules with the same @-aliases the app uses.
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@features': r('./features'),
      '@shared': r('./shared'),
      '@lib': r('./lib'),
      '@store': r('./store'),
      '@constants': r('./constants'),
      '@translations': r('./translations'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
