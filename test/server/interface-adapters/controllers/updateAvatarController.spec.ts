import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { updateAvatarController } from '@@/server/interface-adapters/controllers/updateAvatarController'
import { initializeContainer, destroyContainer } from '~~/server/di/container'
import { createUserUsecase } from '~~/server/application/usecases/user'

describe('updateAvatarController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should update an avatar', async () => {
    const blob = new ArrayBuffer(8)
    const user = await createUserUsecase(userData)

    expect(user).toBeDefined()

    const avatar = await updateAvatarController({
      file: new File([blob], 'avatar.png', { type: 'image/png' }),
      userId: user!.id,
      currentAvatar: 'current-avatar',
    })

    expect(avatar).toBeDefined()
    expect(avatar.updatedUser).toBeDefined()
    expect(avatar.blob.pathname).toBe(`/${user!.id}/avatar-fakeuuid.png`)
  })

  it('should update an avatar without current avatar', async () => {
    const blob = new ArrayBuffer(8)
    const user = await createUserUsecase(userData)

    expect(user).toBeDefined()

    const avatar = await updateAvatarController({
      file: new File([blob], 'avatar.png', { type: 'image/png' }),
      userId: user!.id,
    })

    expect(avatar).toBeDefined()
    expect(avatar.updatedUser).toBeDefined()
    expect(avatar.blob.pathname).toBe(`/${user!.id}/avatar-fakeuuid.png`)
  })
})
