// @vitest-environment node

import { test, expect } from '@nuxt/test-utils/playwright'

test('login', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })

  await expect(page).toHaveTitle('Login')
})

/* import { createPage, setup, url } from '@nuxt/test-utils/e2e'

import { describe, test, expect } from 'vitest'

describe('Login', async () => {
  await setup({

  })

  test('login', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })

    // const title = await page.title()

    // expect(title).toBe('Login')
    expect(true).toBe(true)
  })
}) */
