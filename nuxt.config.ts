import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@sentry/nuxt/module',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/content',
    '@nuxt/ui-pro',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  content: {
    // defaultLocale: 'en',

    // locales: ['en', 'fr'],
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      siteUrl: 'http://localhost:3000',
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
  routeRules: {
    '/app/**': {
      appMiddleware: ['auth'],
    },
  },
  sourcemap: { client: 'hidden' },
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-09-02',
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      // openAPI: true,
    },
    rollupConfig: {
      // @ts-expect-error - Vite config
      plugins: [vue()],
    },
  },
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
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
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.yml',
      }, {
        code: 'fr',
        name: 'Français',
        language: 'fr-FR',
        file: 'fr.yml',
      },
    ],
    defaultLocale: 'en',
    // vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
  },
  image: {
    providers: {
      myProvider: {
        name: 'nuxthub', // optional value to overrider provider name
        provider: '~/providers/nuxthub.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: process.env.NUXT_PUBLIC_SITE_URL,
        },
      },
    },
  },
  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.NUXT_SENTRY_ORG,
      project: process.env.NUXT_SENTRY_PROJECT,
      authToken: process.env.NUXT_SENTRY_AUTH_TOKEN,
    },

  },
})
