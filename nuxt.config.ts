import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/test-utils/module',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
    resendApiKey: '',
    emails: {
      fromEmail: 'onboarding@resend.dev',
    },
  },
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
    rollupConfig: {
      // @ts-expect-error - Vite config
      plugins: [vue()],
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
  ui: {
    icons: ['simple-icons'],
  },
  compatibilityDate: '2024-07-02',
})
