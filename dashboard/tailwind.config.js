import sharedPreset from '../config/tailwind/shared.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedPreset],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
};
