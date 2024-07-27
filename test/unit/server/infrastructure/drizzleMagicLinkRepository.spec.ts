import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import type { IMagicLinkRepository } from '~~/server/application/repositories'
import { destroyContainer, getInjection, initializeContainer } from '~~/server/di/container'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleMagicLinkRepository', () => {
  let magicLinkRepository: IMagicLinkRepository

  beforeEach(() => {
    initializeContainer()

    magicLinkRepository = getInjection('IMagicLinkRepository')
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a magic link', async () => {
    const token = await magicLinkRepository.upsertMagicLink(userData.email)

    expect(token).toBeDefined()
  })

  it('should get a magic link by token', async () => {
    const newMagicLink = await magicLinkRepository.upsertMagicLink(userData.email)

    const magicLink = await magicLinkRepository.getMagicLinkByToken(newMagicLink!.token)

    expect(magicLink).toBeDefined()
  })

  it('should delete a magic link', async () => {
    const newMagicLink = await magicLinkRepository.upsertMagicLink(userData.email)

    expect(newMagicLink).toBeDefined()

    const magicLink = await magicLinkRepository.deleteMagicLink(newMagicLink!.token)

    expect(magicLink).toBe(newMagicLink)
  })

  it('should not delete a magic link if email does not exist', async () => {
    const newMagicLink = await magicLinkRepository.upsertMagicLink(userData.email)

    const magicLink = await magicLinkRepository.deleteMagicLink('bad-email')

    expect(magicLink).toBeUndefined()

    const existingMagicLink = await magicLinkRepository.getMagicLinkByToken(newMagicLink!.token)

    expect(existingMagicLink).toBeDefined()
  })

  it('should update a magic link', async () => {
    const newMagicLink = await magicLinkRepository.upsertMagicLink(userData.email)

    const newToken = await magicLinkRepository.upsertMagicLink(userData.email)

    expect(newToken).not.toBe(newMagicLink!.token)
  })
})
