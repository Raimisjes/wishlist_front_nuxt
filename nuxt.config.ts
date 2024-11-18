// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap',
        },
      ],
      title: 'gftme.one',
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    'pinia-plugin-persistedstate/nuxt',
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: 'custom',
        themes: {
          custom: {
            dark: false,
            colors: {
              primary: '#00B565',
              error: '#d12323',
            },
          },
        },
      },
    },
  },
  css: ['~/assets/styles.scss'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
    },
  },
});
