// eslint.config.js
import { defineConfig } from 'eslint-define-config';
import nuxtPlugin from 'eslint-plugin-nuxt';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueEslintParser from 'vue-eslint-parser';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      nuxt: nuxtPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    ignores: ['node_modules/', '.nuxt/', 'dist/', '.history/**'],
  },
]);
