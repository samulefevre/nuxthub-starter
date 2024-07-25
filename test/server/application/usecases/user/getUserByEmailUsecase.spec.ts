import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase, getUserByEmailUsecase } from '@@/server/application/usecases/user'
import { initializeContainer, destroyContainer } from '~~/server/di/container'

describe('getUserByEmailUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should get user', async () => {
    const newUser = await createUserUsecase({
      email: userData.email,
      name: userData.name,
    })

    expect(newUser).toBeDefined()

    const user = await getUserByEmailUsecase(newUser!.email)

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
    expect(user?.name).toBe(userData.name)
  })
})
