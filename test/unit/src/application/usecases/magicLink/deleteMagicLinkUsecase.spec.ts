import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { upsertMagicLinkUsecase, deleteMagicLinkUsecase } from '@@/src/application/usecases/magicLink'
import { initializeContainer, destroyContainer } from '~~/di/container'

describe('deleteMagicLinkUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete magicLink', async () => {
    const newMagicLink = await upsertMagicLinkUsecase({
      email: userData.email,
    })

    console.log('newMagicLinkToken', newMagicLink.token)

    expect(newMagicLink).toBeDefined()

    const magicLink = await deleteMagicLinkUsecase(newMagicLink.token)

    expect(magicLink).toBeDefined()
    expect(magicLink?.email).toBe(userData.email)
    expect(magicLink?.token).toBe(newMagicLink.token)
  })

  it('should throw error if the magicLink does not exist', async () => {
    expect(deleteMagicLinkUsecase('non-existent-token')).rejects.toThrow('Failed to delete magic link')
  })
})
