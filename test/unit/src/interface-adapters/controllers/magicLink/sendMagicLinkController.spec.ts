import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { sendMagicLinkController } from '@@/src/interface-adapters/controllers/magicLink/sendMagicLinkController'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'
import { createUserUsecase } from '~~/src/application/usecases/user'

describe('sendMagicLinkController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should send magicLink', async () => {
    const user = await createUserUsecase(userData)
    expect(user).toBeDefined()

    const magicLink = await sendMagicLinkController({ email: user!.email })

    expect(magicLink).toBeDefined()
  })
})
