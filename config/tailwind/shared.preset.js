import reavaTheme from '../theme/reavaTheme.js';

/** @type {import('tailwindcss').Config} */
const sharedPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: reavaTheme.palette.primary,
        secondary: reavaTheme.palette.secondary,
        accent: reavaTheme.palette.accent,
        neutral: reavaTheme.palette.neutral,
        success: reavaTheme.palette.success,
        warning: reavaTheme.palette.warning,
        danger: reavaTheme.palette.danger,
        background: reavaTheme.palette.background,
        surface: reavaTheme.palette.surface,
      },
      fontFamily: {
        heading: reavaTheme.typography.heading,
        body: reavaTheme.typography.body,
        mono: reavaTheme.typography.mono,
      },
      borderRadius: reavaTheme.radii,
      boxShadow: {
        focus: reavaTheme.shadows.focus,
        card: reavaTheme.shadows.card,
      },
      transitionTimingFunction: {
        'emphasized-in': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        'emphasized-out': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      },
    },
  },
  plugins: [],
};

export default sharedPreset;
