// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
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
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    'pinia-plugin-persistedstate/nuxt',
  ],
  // alias: {
  //   pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  // },
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
              remove: '#d53636',
            },
          },
        },
      },
      icons: {
        defaultSet: 'mdi',
        sets: ['mdi', 'fa'],
      },
    },
  },
  css: ['~/assets/styles/styles.scss'],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/_variables.scss" as *;`,
          api: 'modern-compiler',
        },
      },
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
  experimental: { appManifest: false },
});
