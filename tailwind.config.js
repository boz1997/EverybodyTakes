/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './shared/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#13131A',
          card: '#1A1A24',
          elevated: '#22222E',
        },
        brand: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          dark: '#7C3AED',
          glow: '#A855F720',
        },
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B4CC',
          muted: '#6B6B8A',
          inverse: '#0A0A0F',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        border: {
          DEFAULT: '#2A2A3A',
          subtle: '#1E1E2C',
          brand: '#A855F740',
        },
      },
      fontFamily: {
        sans: ['Inter', 'System'],
        display: ['Inter', 'System'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};
