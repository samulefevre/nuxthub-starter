import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { upsertMagicLinkUsecase } from '@@/src/application/usecases/magicLink'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('upsertMagicLinkUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
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
