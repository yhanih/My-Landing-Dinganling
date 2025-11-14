const palette = {
  primary: {
    50: '#f3f0ff',
    100: '#e5dcff',
    200: '#c4b0ff',
    300: '#a184ff',
    400: '#8666fa',
    500: '#6f3ff5',
    600: '#5b2ee5',
    700: '#4c20c7',
    800: '#3d1aa0',
    900: '#2a1369',
    foreground: '#f9f7ff',
  },
  secondary: {
    50: '#f0f8ff',
    100: '#d9eeff',
    200: '#a8d8ff',
    300: '#72c1ff',
    400: '#3ba4ff',
    500: '#0d8bff',
    600: '#0073e6',
    700: '#005bb4',
    800: '#004489',
    900: '#022a54',
    foreground: '#f8fbff',
  },
  accent: {
    50: '#eefdfd',
    100: '#d4f8f7',
    200: '#a7f0ef',
    300: '#6de3e2',
    400: '#3dd6d5',
    500: '#12c8c7',
    600: '#00a9a9',
    700: '#008080',
    800: '#005353',
    900: '#002d2d',
    foreground: '#022121',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#16a34a',
  warning: '#f59e0b',
  danger: '#dc2626',
  background: '#0f172a',
  surface: '#12182f',
};

const typography = {
  heading: ['"Urbanist"', 'system-ui', 'sans-serif'],
  body: ['"Inter"', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
};

const radii = {
  sm: '0.5rem',
  DEFAULT: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

const shadows = {
  focus: '0 0 0 3px rgba(111, 63, 245, 0.35)',
  card: '0 20px 45px -18px rgba(15, 23, 42, 0.45)',
};

const buttons = {
  primary:
    'bg-primary-500 text-primary-foreground shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 hover:bg-primary-400',
  secondary:
    'bg-secondary-500 text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200 hover:bg-secondary-400',
  outline:
    'border border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
  ghost:
    'text-primary-500 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
};

const reavaTheme = {
  palette,
  typography,
  radii,
  shadows,
  buttons,
};

export default reavaTheme;
export { palette as colors };
