import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { upsertMagicLinkUsecase, deleteMagicLinkUsecase } from '@@/src/application/usecases/magicLink'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('deleteMagicLinkUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete magicLink', async () => {
    const newMagicLink = await upsertMagicLinkUsecase({
      email: userData.email,
    })

    console.log('newMagicLinkToken1', newMagicLink.token)

    expect(newMagicLink).toBeDefined()

    const magicLink = await deleteMagicLinkUsecase(newMagicLink.token)

    console.log('MagicLink111', newMagicLink)

    expect(magicLink).toBeDefined()
    expect(magicLink?.email).toBe(userData.email)
    expect(magicLink?.token).toBe(newMagicLink.token)
  })

  it('should throw error if the magicLink does not exist', async () => {
    expect(deleteMagicLinkUsecase('non-existent-token')).rejects.toThrow('Failed to delete magic link')
  })
})
