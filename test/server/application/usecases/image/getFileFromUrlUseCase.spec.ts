import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { getFileFromUrlUseCase } from '~~/server/application/usecases/image'
import { destroyContainer, initializeContainer } from '~~/server/di/container'

describe('getFileFromUrlUseCase usecases', () => {
  beforeEach(async () => {
    initializeContainer()
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should file from url', async () => {
    const avatar = 'http://example.com/avatar.jpg'
    const image = await getFileFromUrlUseCase(avatar)

    expect(image).toBeInstanceOf(File)
    expect(image?.name.split('.').pop()).toBe('jpg')
  })
})
