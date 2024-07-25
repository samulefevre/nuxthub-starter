import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { upsertMagicLinkUsecase, getMagicLinkByTokenUsecase } from '@@/server/application/usecases/magicLink'
import { initializeContainer, destroyContainer } from '~~/server/di/container'

describe('getMagicLinkByTokenUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should get the magicLink with given token', async () => {
    const newMagicLink = await upsertMagicLinkUsecase({
      email: userData.email,
    })

    expect(newMagicLink).toBeDefined()

    const magicLink = await getMagicLinkByTokenUsecase(newMagicLink.token)

    expect(magicLink).toBeDefined()
    expect(magicLink?.email).toBe(userData.email)
    expect(magicLink?.token).toBe(newMagicLink.token)
  })

  it('should return undefined if the magicLink does not exist', async () => {
    const magicLink = await getMagicLinkByTokenUsecase('non-existent-token')

    expect(magicLink).toBeUndefined()
  })
})
