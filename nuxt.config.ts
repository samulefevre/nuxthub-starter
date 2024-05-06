// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
  },
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },
  routeRules: {
    '/app/**': {
      appMiddleware: ['auth'],
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.yml',
      }, {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.yml',
      },
    ],
    langDir: 'i18n/',
    defaultLocale: 'en',
    // vueI18n: './i18n.config.ts',
    strategy: 'prefix_and_default',
  },
  content: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
})
