import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createMagicUserUsecase } from '@@/server/application/usecases/user'
import { initializeContainer, destroyContainer } from '~~/server/di/container'

describe('createMagicUserUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
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
