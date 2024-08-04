import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { deleteAccountController } from '@@/server/interface-adapters/controllers/user/deleteAccountController'
import { initializeContainer, destroyContainer } from '~~/server/di/container'
import { createUserUsecase } from '~~/server/application/usecases/user'
import { upsertDeleteAccountTokenUsecase } from '~~/server/application/usecases/deleteAccountToken'

describe('deleteAccountController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete account', async () => {
    const user = await createUserUsecase(userData)
    expect(user).toBeDefined()

    const newToken = await upsertDeleteAccountTokenUsecase(user!.id)

    expect(newToken).toBeDefined()

    const deletedUser = await deleteAccountController({ userId: user!.id, token: 'mock-token' })

    expect(deletedUser).toBeDefined()
  })

  it('should throw an error if user does not exist', async () => {
    await expect(deleteAccountController({ userId: 10, token: 'mock-token' })).rejects.toThrow('Token not found')
  })

  it('should throw an error if token is invalid', async () => {
    const user = await createUserUsecase(userData)
    expect(user).toBeDefined()

    await expect(deleteAccountController({ userId: user!.id, token: 'invalid-token' })).rejects.toThrow('Token not found')
  })
})
