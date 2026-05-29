export const colors = {
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
    glow: 'rgba(168, 85, 247, 0.12)',
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
    brand: 'rgba(168, 85, 247, 0.25)',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;
