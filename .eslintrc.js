// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:nuxt/recommended', // Nuxt-specific rules
    'plugin:prettier/recommended', // Runs Prettier as an ESLint rule
  ],
  plugins: ['prettier'], // Enables Prettier as an ESLint plugin
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier configuration
    // You can add more custom ESLint rules here
  },
};
