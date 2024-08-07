import { defineVitestConfig } from '@nuxt/test-utils/config'

import { configDefaults, defineConfig } from 'vitest/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    // root: './test/unit',
    // exclude end-to-end tests and node_modules
    // exclude: ['node_modules'],
    // exclude: [...configDefaults.exclude, 'test/e2e'],
    // ...defineConfig,
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
})
