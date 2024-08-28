import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { signInController } from '@@/src/interface-adapters/controllers/auth/signInController'
import { initializeContainer, destroyContainer } from '~~/di/container'

describe('signInController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should signIn', async () => {
    const signedUser = await signInController({ email: userData.email, name: userData.name })

    expect(signedUser).toBeDefined()
  })
})
