import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase } from '@@/src/application/usecases/user'
import { initializeContainer, destroyContainer } from '~~/di/container'

describe('createUserUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a new user', async () => {
    const user = await createUserUsecase({
      email: userData.email,
      name: userData.name,
    })

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
    expect(user?.name).toBe(userData.name)
  })
})
