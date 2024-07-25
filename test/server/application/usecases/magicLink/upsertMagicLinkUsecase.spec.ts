import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { upsertMagicLinkUsecase } from '@@/server/application/usecases/magicLink'
import { initializeContainer, destroyContainer } from '~~/server/di/container'

describe('upsertMagicLinkUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a magicLink', async () => {
    const magicLink = await upsertMagicLinkUsecase({
      email: userData.email,
    })

    expect(magicLink).toBeDefined()
    expect(magicLink.email).toBe(userData.email)
    expect(magicLink.token).toBe('mock-token')
  })
})
