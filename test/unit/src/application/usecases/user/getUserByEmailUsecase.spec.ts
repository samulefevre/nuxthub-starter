import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase, getUserByEmailUsecase } from '@@/src/application/usecases/user'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('getUserByEmailUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
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
