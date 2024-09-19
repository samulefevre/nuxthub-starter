import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { createUserUsecase, deleteUserUsecase } from '@@/src/application/usecases/user'
import { destroyContainer, initializeContainerForTests } from '~~/di/ioc'

describe('deleteUserUsecase', () => {
  const userData = { email: 'test@example.com', name: 'Test User', avatarUrl: 'https://example.com/avatar.png' }

  beforeEach(async () => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete the user', async () => {
    const user = await createUserUsecase({
      email: userData.email,
      name: userData.name,
    })
    expect(user).toBeDefined()

    const deletedUser = await deleteUserUsecase(user!.id)

    expect(deletedUser).toBeDefined()
    expect(deletedUser?.id).toBe(user!.id)
  })

  it('should return undefined if the user does not exist', async () => {
    const deletedUser = await deleteUserUsecase(200)

    expect(deletedUser).toBeUndefined()
  })
})
