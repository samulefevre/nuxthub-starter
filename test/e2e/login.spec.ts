import { test, expect } from '@nuxt/test-utils/playwright'

test('login', async ({ page, goto }) => {
  await goto('http://localhost:3000/login', { waitUntil: 'hydration' })

  await expect(page).toHaveTitle('Login')
})
