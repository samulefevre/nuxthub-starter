import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { getFileFromUrlUsecase } from '~~/src/application/usecases/image'
import { destroyContainer, initializeContainerForTests } from '~~/di/ioc'

describe('getFileFromUrlUseCase usecases', () => {
  beforeEach(async () => {
    initializeContainerForTests()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should file from url', async () => {
    const avatar = 'http://example.com/avatar.jpg'
    const image = await getFileFromUrlUsecase(avatar)

    expect(image).toBeInstanceOf(File)
    expect(image?.name.split('.').pop()).toBe('jpg')
  })
})
