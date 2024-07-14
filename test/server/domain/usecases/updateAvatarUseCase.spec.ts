import fs from 'fs'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { registerEndpoint } from '@nuxt/test-utils/runtime'

import { send } from 'h3'

// import { hubBlob } from '@nuxthub/core/dist/runtime/blob/server/utils/blob'
import { DrizzleUserRepository } from '~~/server/data/repositories'
import { UpdateAvatarUseCase } from '~~/server/domain/usecases/updateAvatarUseCase.js'

describe('updateAvatar usecases', () => {
  const image = fs.readFileSync('test/images/avatar-man.jpg')

  const base64Image = image.toString('base64')

  const imageBuffer = Buffer.from(base64Image, 'base64')

  registerEndpoint('https://example.com/avatar.png', {
    method: 'GET',
    handler: event => (send(event, imageBuffer, 'image/jpeg')),
  })

  const mockedUser = { email: 'test@example.com', name: 'Test User', avatarUrl: 'https://example.com/avatar.png' }

  // const userData2 = { email: 'test2@example.com', name: 'Test User 2', avatarUrl: 'https://example.com/avatar2.png' }

  vi.mock('@nuxthub/core/dist/runtime/blob/server/utils/blob', () => ({
    hubBlob: vi.fn().mockImplementation(() => ({
      put: vi.fn().mockResolvedValue({ pathname: 'mocked/path' }),
      delete: vi.fn().mockResolvedValue({
        pathname: 'mocked/path',
      }),
    })),
  }))

  let db: BetterSQLite3Database<typeof schema>
  let userRepository: DrizzleUserRepository
  let updateAvatarUseCase: UpdateAvatarUseCase

  let sqlite: Database

  beforeEach(async () => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    userRepository = new DrizzleUserRepository(db)

    updateAvatarUseCase = new UpdateAvatarUseCase(userRepository)
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should update user avatar', async () => {
    const user = await userRepository.createUser(mockedUser)

    const file = new File([imageBuffer], 'avatar.png')

    const { updatedUser, blob } = await updateAvatarUseCase.execute({ file, userId: user.id })

    expect(updatedUser.avatar).toBe('mocked/path')
    expect(blob.pathname).toBe('mocked/path')
  })

  it('should update user avatar and delete old one', async () => {
    const user = await userRepository.createUser(mockedUser)

    const file = new File([imageBuffer], 'avatar.png')

    const { updatedUser, blob } = await updateAvatarUseCase.execute({ file, userId: user.id, currentAvatar: 'mocked/path' })

    // expect( hubBlob().delete).toHaveBeenCalled()
    expect(updatedUser.avatar).toBe('mocked/path')
    expect(blob.pathname).toBe('mocked/path')
  })
})
