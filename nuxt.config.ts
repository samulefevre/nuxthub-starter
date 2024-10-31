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
    '@sentry/nuxt/module',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      sentry: {
        dsn: '',
        environment: 'development',
      },
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
        language: 'en-US',
        file: 'en.yml',
      }, {
        code: 'fr',
        language: 'fr-FR',
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
  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.NUXT_SENTRY_ORG,
      project: process.env.NUXT_SENTRY_PROJECT,
      authToken: process.env.NUXT_SENTRY_AUTH_TOKEN,
    },
  },
  compatibilityDate: '2024-09-02',
})
