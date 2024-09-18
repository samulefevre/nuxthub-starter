import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { updateAvatarController } from '@@/src/interface-adapters/controllers/image/updateAvatarController'
import { initializeContainerForTests, destroyContainer } from '~~/di/ioc'
import { createUserUsecase } from '~~/src/application/usecases/user'

describe('updateAvatarController', () => {
  const userData = { email: 'test@example.com', name: 'Test User' }

  beforeEach(() => {
    initializeContainerForTests()
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
