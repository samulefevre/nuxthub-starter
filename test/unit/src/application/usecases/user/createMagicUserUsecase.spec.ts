import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createMagicUserUsecase } from '@@/src/application/usecases/user'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('createMagicUserUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a new user', async () => {
    const user = await createMagicUserUsecase({
      email: userData.email,
    })

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
    expect(user?.name).toBe('Test')
  })

  it('should return the correct name', async () => {
    const email = 'firstname.lastname@example.com'

    const user = await createMagicUserUsecase({
      email: 'firstname.lastname@example.com',
    })

    expect(user).toBeDefined()
    expect(user?.email).toBe(email)
    expect(user?.name).toBe('Firstname Lastname')
  })
})
