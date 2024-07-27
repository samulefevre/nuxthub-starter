import { createPage, setup, url } from '@nuxt/test-utils/e2e'

import { describe, it, expect } from 'vitest'

describe('Login', async () => {
  await setup({
    host: 'http://localhost:3000',
  })

  it('shoud have the good title', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const pageTitle = await page.title()
    expect(pageTitle).toBe('NuxtHub Starter')
  })

  it('shoud have h1 Login', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const h1 = await page.textContent('h1')
    expect(h1).toContain('Login')
  })

  it('shoud have the google social link', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const googleLink = await page.$('a[href="/auth/google"]')

    expect(googleLink).toBeTruthy()
  })

  it('shoud have the github social link', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const githubLink = await page.$('a[href="/auth/github"]')
    expect(githubLink).toBeTruthy()
  })

  it('shoud have the email input', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const emailInput = await page.$('input[type="email"]')
    expect(emailInput).toBeTruthy()
  })

  it('should have the submit button', async () => {
    const page = await createPage(url('/'))
    await page.goto(url('/login'), { waitUntil: 'hydration' })

    const submitButton = await page.$('button[type="submit"]')
    expect(submitButton).toBeTruthy()
  })
})
