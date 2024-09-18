import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { signInController } from '@@/src/interface-adapters/controllers/auth/signInController'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('signInController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should signIn', async () => {
    const signedUser = await signInController({ email: userData.email, name: userData.name })

    expect(signedUser).toBeDefined()
  })
})
