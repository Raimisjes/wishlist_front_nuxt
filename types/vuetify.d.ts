// types/vuetify.d.ts
import type { ModuleOptions } from 'vuetify-nuxt-module'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuetify?: ModuleOptions
  }
  interface NuxtOptions {
    vuetify?: ModuleOptions
  }
}

export {};