import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { loginWithMagicLinkController } from '@@/src/interface-adapters/controllers/auth/loginWithMagicLinkController'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'
import { createUserUsecase } from '~~/src/application/usecases/user'
import { upsertMagicLinkUsecase } from '~~/src/application/usecases/magicLink'

describe('loginWithMagicLinkController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should login with magicLink', async () => {
    const user = await createUserUsecase(userData)
    expect(user).toBeDefined()

    const upsertedMagicLink = await upsertMagicLinkUsecase({ email: user!.email })

    expect(upsertedMagicLink).toBeDefined()

    const magicLink = await loginWithMagicLinkController({ token: upsertedMagicLink!.token })

    expect(magicLink).toBeDefined()
  })

  it('should throw an error if token does not exist', async () => {
    await expect(loginWithMagicLinkController({ token: 'mock-token' })).rejects.toThrow('Magic link not found')
  })
})
