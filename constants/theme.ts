// Film / Editorial palette — warm paper, ink, restrained amber.
// Token shape is kept stable (bg / brand / gold / text / border) so every
// screen that references these adopts the new look without churn.
export const colors = {
  bg: {
    primary: '#EFE7D6',    // warm paper
    secondary: '#E7DDC9',  // deeper paper (for gradients)
    card: '#FAF5EB',        // raised paper
    elevated: '#FFFFFF',
  },
  brand: {
    DEFAULT: '#BE6A2E',     // analog amber — the accent
    light: '#D68A4C',
    dark: '#974F1F',
    glow: 'rgba(190, 106, 46, 0.10)',
  },
  gold: {
    DEFAULT: '#9A7634',     // bronze, for the "Pro" tier
    light: '#C2A05A',
    dark: '#6F541F',
  },
  text: {
    primary: '#221D16',     // warm ink
    secondary: '#5B5247',
    muted: '#9C9182',
    inverse: '#F4EEE1',     // on dark/amber surfaces
  },
  success: '#4E7C59',
  error: '#B1452F',
  warning: '#BE6A2E',
  border: {
    DEFAULT: '#DCD2BF',
    subtle: '#E7DECB',
    brand: 'rgba(190, 106, 46, 0.30)',
  },
  // Dark contexts (camera viewfinder, scanner) stay near-black.
  black: '#14110C',
} as const;

// Gradients used across screens (replaces inline neon arrays).
export const gradients = {
  page: ['#F3ECDC', '#EAE0CC'] as [string, string],      // editorial paper
  pageWarm: ['#F4EDDD', '#EFE3CC'] as [string, string],
  amber: ['#C97B3C', '#9A4F20'] as [string, string],     // primary button / accent
  bronze: ['#A8843E', '#6F541F'] as [string, string],    // pro tier
  dark: ['#1A1610', '#14110C'] as [string, string],      // camera chrome
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

export const fonts = {
  display: 'Fraunces_600SemiBold',     // editorial serif headings
  displayBold: 'Fraunces_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
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
