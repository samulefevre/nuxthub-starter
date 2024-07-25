import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { deleteAvatarUseCase } from '~~/server/application/usecases/image'
import { destroyContainer, initializeContainer } from '~~/server/di/container'

describe('deleteAvatar usecases', () => {
  beforeEach(async () => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should delete user avatar', async () => {
    const avatar = 'fakeavatar'
    const image = await deleteAvatarUseCase(avatar)

    expect(image?.pathname).toBe(avatar)
  })
})
