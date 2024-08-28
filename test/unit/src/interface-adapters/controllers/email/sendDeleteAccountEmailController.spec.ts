import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { sendDeleteAccountEmailController } from '@@/src/interface-adapters/controllers/email/sendDeleteAccountEmailController'
import { initializeContainer, destroyContainer } from '~~/di/container'
import { createUserUsecase } from '~~/src/application/usecases/user'

describe('sendDeleteAccountEmailController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should send deleteAccountEmail', async () => {
    const user = await createUserUsecase(userData)
    expect(user).toBeDefined()

    const magicLink = await sendDeleteAccountEmailController(user!.id)

    expect(magicLink).toBeDefined()
  })

  it('should throw error if user not found', async () => {
    await expect(sendDeleteAccountEmailController(10)).rejects.toThrow('User not found')
  })
})
