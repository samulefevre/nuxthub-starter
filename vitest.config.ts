import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    // exclude end-to-end tests and node_modules
    exclude: ['test/e2e/**/*.spec.ts', 'node_modules'],
  },
})
