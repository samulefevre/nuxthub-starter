import 'reflect-metadata'

import fs from 'fs'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { saveAvatarUsecase } from '~~/server/application/usecases/image/saveAvatarUsecase'
import { destroyContainer, initializeContainer } from '~~/server/di/container'

describe('saveAvatar usecases', () => {
  const image = fs.readFileSync('test/images/avatar-man.jpg')

  const base64Image = image.toString('base64')

  const imageBuffer = Buffer.from(base64Image, 'base64')

  const userId = 1

  beforeEach(async () => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should update user avatar', async () => {
    const file = new File([imageBuffer], 'avatar.jpg')

    const image = await saveAvatarUsecase({ file, userId: userId })

    expect(image?.pathname).toBe(`/${userId}/avatar-fakeuuid.jpg`)
  })
})
