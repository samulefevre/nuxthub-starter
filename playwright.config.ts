import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  timeout: 400000,
  testDir: fileURLToPath(new URL('test/e2e', import.meta.url)),
  fullyParallel: true,
  // ...
})
