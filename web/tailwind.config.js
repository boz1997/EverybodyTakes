/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        paper: { DEFAULT: '#EFE7D6', deep: '#E7DDC9', card: '#FAF5EB' },
        brand: { DEFAULT: '#BE6A2E', light: '#D68A4C', dark: '#974F1F' },
        ink: { DEFAULT: '#221D16', soft: '#5B5247', muted: '#9C9182' },
        line: '#DCD2BF',
      },
    },
  },
  plugins: [],
};
