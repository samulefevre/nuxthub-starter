import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { sendMagicLinkController } from '@@/server/interface-adapters/controllers/magicLink/sendMagicLinkController'
import { initializeContainer, destroyContainer } from '~~/server/di/container'
import { createUserUsecase } from '~~/server/application/usecases/user'

describe('sendMagicLinkController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
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
