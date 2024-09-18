import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { deleteAvatarUsecase } from '~~/src/application/usecases/image'
import { destroyContainer, initializeContainerForTests } from '~~/di/ioc'

describe('deleteAvatar usecases', () => {
  beforeEach(async () => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete user avatar', async () => {
    const avatar = 'fakeavatar'
    const image = await deleteAvatarUsecase(avatar)

    expect(image?.pathname).toBe(avatar)
  })
})
