import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { DrizzleUserRepository } from '~~/server/data/repositories'
import { sendDeleteAccountEmailUseCase, deleteAccountUseCase } from '~~/server/domain/usecases/deleteAccount'

describe('deleteAccount usecases', () => {
  const userData = { email: 'test@example.com', name: 'Test User', avatarUrl: 'https://example.com/avatar.png' }

  vi.mock('@@/server/utils/email', () => ({
    useEmail: vi.fn().mockImplementation(() => ({
      sendMagicLink: vi.fn().mockResolvedValue({ ok: true }),
      sendDeleteAccountEmail: vi.fn().mockResolvedValue({ ok: true }),
    })),
  }))

  let db: BetterSQLite3Database<typeof schema>
  let userRepository: DrizzleUserRepository

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    userRepository = new DrizzleUserRepository(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should send a delete account email', async () => {
    const user = await userRepository.createUser(userData)

    expect(user).toBeDefined()

    const deleteAccountEmailSent = await sendDeleteAccountEmailUseCase({
      userRepository,
      userId: user.id,
      resendApiKey: 'dummy',
      baseUrl: 'http://localhost:3000',
      fromEmail: 'dummy',
    })

    expect(deleteAccountEmailSent).toBeDefined()
  })

  it('should delete the account', async () => {
    const user = await userRepository.createUser(userData)

    expect(user).toBeDefined()

    const token = await userRepository.createDeleteAccountToken({
      userId: user.id,
    })

    expect(token).toBeDefined()

    const deleteAccount = await deleteAccountUseCase({
      userRepository,
      userId: user.id,
      token,
    })

    expect(deleteAccount).toBeDefined()

    const deletedUser = await userRepository.getUser(user.id)

    expect(deletedUser).toBeUndefined()
  })

  it('should throw an error if the token is not found', async () => {
    const user = await userRepository.createUser(userData)

    expect(user).toBeDefined()

    await expect(deleteAccountUseCase({
      userRepository,
      userId: user.id,
      token: 'invalid',
    })).rejects.toThrow('Token not found')
  })
})
