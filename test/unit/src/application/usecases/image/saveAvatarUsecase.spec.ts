import fs from 'fs'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { saveAvatarUsecase } from '~~/src/application/usecases/image/saveAvatarUsecase'
import { destroyContainer, initializeContainerForTests } from '~~/di/ioc'

describe('saveAvatar usecases', () => {
  const image = fs.readFileSync('test/unit/images/avatar-man.jpg')

  const base64Image = image.toString('base64')

  const imageBuffer = Buffer.from(base64Image, 'base64')

  const userId = 1

  beforeEach(async () => {
    initializeContainerForTests()
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
