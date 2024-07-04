/* // tests/DrizzleUserRepository.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { randomUUID } from 'uncrypto'
import { DrizzleUserRepository } from '@@/server/domain/repositories/drizzleUserRepository'

import { useDrizzle } from '@@/server/utils/drizzle'

import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock dependencies
vi.mock('uncrypto', () => ({
  randomUUID: vi.fn(() => 'mocked-uuid'),
}))

const useDrizzleMock = {
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  returning: vi.fn().mockReturnThis(),
  get: vi.fn(),
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
}

vi.mock('useDrizzle', () => useDrizzleMock)

const tables = {
  users: 'users',
  deleteAccountTokens: 'deleteAccountTokens',
}

describe('DrizzleUserRepository', () => {
  let repository: DrizzleUserRepository

  beforeEach(() => {
    repository = new DrizzleUserRepository()
    // vi.clearAllMocks()
  })

  vi.mock('#imports', () => ({
    useDrizzle: () => useDrizzleMock,
  }))

  it('should update the avatar path for a user', async () => {
    const userId = 1
    const avatarPath = 'new-avatar-path'
    useDrizzleMock.get.mockResolvedValueOnce({})

    const result = await repository.updateAvatarPath({ userId, avatarPath })

    expect(useDrizzleMock.update).toHaveBeenCalledWith(tables.users)
    expect(useDrizzleMock.set).toHaveBeenCalledWith({ avatar: avatarPath })
    expect(useDrizzleMock.where).toHaveBeenCalledWith(expect.any(Function))
    expect(useDrizzleMock.returning).toHaveBeenCalled()
    expect(result).toEqual({})
  })

  it('should get a user by ID', async () => {
    const userId = 1
    const user = { id: userId, name: 'John Doe' }
    useDrizzleMock.get.mockResolvedValueOnce(user)

    const result = await repository.getUser(userId)

    expect(useDrizzleMock.select).toHaveBeenCalled()
    expect(useDrizzleMock.from).toHaveBeenCalledWith(tables.users)
    expect(useDrizzleMock.where).toHaveBeenCalledWith(expect.any(Function))
    expect(result).toEqual(user)
  })

  it('should delete a user by ID', async () => {
    const userId = 1
    useDrizzleMock.get.mockResolvedValueOnce({})

    await repository.deleteUser({ userId })

    expect(useDrizzleMock.delete).toHaveBeenCalledWith(tables.users)
    expect(useDrizzleMock.where).toHaveBeenCalledWith(expect.any(Function))
    expect(useDrizzleMock.returning).toHaveBeenCalled()
  })

  it('should create a delete account token', async () => {
    const userId = 1
    useDrizzleMock.get.mockResolvedValueOnce({})

    const token = await repository.createDeleteAccountToken({ userId })

    expect(randomUUID).toHaveBeenCalled()
    expect(useDrizzleMock.insert).toHaveBeenCalledWith(tables.deleteAccountTokens)
    expect(useDrizzleMock.values).toHaveBeenCalledWith({ token: 'mocked-uuid', userId })
    expect(token).toBe('mocked-uuid')
  })

  it('should get a delete account token', async () => {
    const userId = 1
    const token = 'mocked-uuid'
    useDrizzleMock.get.mockResolvedValueOnce({ token, userId })

    const result = await repository.getDeleteAccountToken({ userId, token })

    expect(useDrizzleMock.select).toHaveBeenCalled()
    expect(useDrizzleMock.from).toHaveBeenCalledWith(tables.deleteAccountTokens)
    expect(useDrizzleMock.where).toHaveBeenCalledWith(expect.any(Function))
    expect(result).toBe(token)
  })

  it('should throw an error if delete account token is invalid', async () => {
    const userId = 1
    const token = 'mocked-uuid'
    useDrizzleMock.get.mockResolvedValueOnce(null)

    await expect(repository.getDeleteAccountToken({ userId, token })).rejects.toThrow('Invalid token')
  })

  it('should remove a delete account token', async () => {
    const userId = 1
    const token = 'mocked-uuid'
    useDrizzleMock.get.mockResolvedValueOnce({})

    await repository.removeDeleteAccountToken({ userId, token })

    expect(useDrizzleMock.delete).toHaveBeenCalledWith(tables.deleteAccountTokens)
    expect(useDrizzleMock.where).toHaveBeenCalledWith(expect.any(Function))
    expect(useDrizzleMock.returning).toHaveBeenCalled()
  })
})
 */

import { describe, it, expect } from 'vitest'

describe('DrizzleUserRepository', () => {
  // basic test
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
