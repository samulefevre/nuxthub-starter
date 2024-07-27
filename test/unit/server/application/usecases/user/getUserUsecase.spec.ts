import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase, getUserUsecase } from '@@/server/application/usecases/user'
import { initializeContainer, destroyContainer } from '~~/server/di/container'

describe('getUserUsecase', () => {
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

    const user = await getUserUsecase(newUser!.id)

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
    expect(user?.name).toBe(userData.name)
  })
})
