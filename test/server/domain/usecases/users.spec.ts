import fs from 'fs'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { registerEndpoint } from '@nuxt/test-utils/runtime'

import { send } from 'h3'
import { DrizzleImageRepository, DrizzleUserRepository } from '~~/server/data/repositories'
import { signInUseCase } from '~~/server/domain/usecases/users'

describe('users usecases', () => {
  const image = fs.readFileSync('test/images/avatar-man.jpg')

  const base64Image = image.toString('base64')

  const imageBuffer = Buffer.from(base64Image, 'base64')

  registerEndpoint('https://example.com/avatar.png', {
    method: 'GET',
    handler: event => (send(event, imageBuffer, 'image/jpeg')),
  })

  const userData = { email: 'test@example.com', name: 'Test User', avatarUrl: 'https://example.com/avatar.png' }

  // const userData2 = { email: 'test2@example.com', name: 'Test User 2', avatarUrl: 'https://example.com/avatar2.png' }

  vi.mock('@nuxthub/core/dist/runtime/blob/server/utils/blob', () => ({
    hubBlob: vi.fn().mockImplementation(() => ({
      put: vi.fn().mockResolvedValue({ pathname: 'mocked/path' }),
    })),
  }))

  let db: BetterSQLite3Database<typeof schema>
  let repository: DrizzleUserRepository
  let imageRepository: DrizzleImageRepository

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    repository = new DrizzleUserRepository(db)
    imageRepository = new DrizzleImageRepository()
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should create a new user', async () => {
    const user = await signInUseCase({
      userRepository: repository,
      imageRepository,
      email: userData.email,
      name: userData.name,
    })

    expect(user).not.toBeUndefined()
    expect(user.email).toBe(userData.email)
    expect(user.name).toBe(userData.name)
  })

  it('should works if user already exists', async () => {
    await signInUseCase({
      userRepository: repository,
      imageRepository,
      email: userData.email,
      name: userData.name,
    })

    const user = await signInUseCase({
      userRepository: repository,
      imageRepository,
      email: userData.email,
      name: userData.name,
    })

    expect(user).not.toBeUndefined()
    expect(user.email).toBe(userData.email)
    expect(user.name).toBe(userData.name)
  })

  it('should update the user avatar', async () => {
    const newUser = await signInUseCase({
      userRepository: repository,
      imageRepository: new DrizzleImageRepository(),
      email: userData.email,
      name: userData.name,
      avatarUrl: userData.avatarUrl,
    })

    expect(newUser).not.toBeUndefined()
    expect(newUser.avatar).toBe('mocked/path')
  })

  it('should not update the user avatar if file is not found', async () => {
    const newUser = await signInUseCase({
      userRepository: repository,
      imageRepository: new DrizzleImageRepository(),
      email: userData.email,
      name: userData.name,
      avatarUrl: 'https://example.com/notfound.png',
    })

    expect(newUser.avatar).toBeNull()
  })
})
