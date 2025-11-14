import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export const createBrowserConfig = ({ files = ['**/*.{js,jsx,ts,tsx}'], ignores = ['dist-landing', 'dist-dashboard'] } = {}) =>
  defineConfig([
    globalIgnores(ignores),
    {
      files,
      ignores: ['**/node_modules/**'],
      extends: [
        js.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
      ],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2021,
        },
      },
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
    },
  ]);

export default createBrowserConfig();
