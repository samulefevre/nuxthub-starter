import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase, updateUserUsecase } from '@@/src/application/usecases/user'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'

describe('updateUserUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should update the user', async () => {
    const newUser = await createUserUsecase({
      email: userData.email,
      name: userData.name,
    })

    expect(newUser).toBeDefined()

    const updateUserData = {
      email: 'newemail@test.fr',
      name: 'New Name',
    }

    const user = await updateUserUsecase(
      {
        userId: newUser!.id,
        updatedUser: {
          email: updateUserData.email,
          name: updateUserData.name,
        },
      },
    )

    expect(user).toBeDefined()
    expect(user?.email).toBe(updateUserData.email)
    expect(user?.name).toBe(updateUserData.name)
  })
})
