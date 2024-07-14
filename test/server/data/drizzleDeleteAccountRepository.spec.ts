import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { DrizzleDeleteAccountTokenRepository, DrizzleUserRepository } from '~~/server/data/repositories'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleDeleteAccountRepository', () => {
  let db: BetterSQLite3Database<typeof schema>
  let userRepository: DrizzleUserRepository
  let deleteAccountTokenRepository: DrizzleDeleteAccountTokenRepository

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    userRepository = new DrizzleUserRepository(db)
    deleteAccountTokenRepository = new DrizzleDeleteAccountTokenRepository(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should create a delete account token', async () => {
    const createdUser = await userRepository.createUser(userData)

    const token = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    expect(token).toBeDefined()
  })

  it('should get a delete account token', async () => {
    const createdUser = await userRepository.createUser(userData)

    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: createdUser.id,
      token: createdDeleteAccountToken.token,
    })

    expect(deleteAccountToken).toBeDefined()
  })

  it('should not get a delete account token with wrong token', async () => {
    const createdUser = await userRepository.createUser(userData)

    await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: createdUser.id,
      token: 'wrong-token',
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should not get a delete account token with wrong user id', async () => {
    const createdUser = await userRepository.createUser(userData)

    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: createdUser.id + 1,
      token: createdDeleteAccountToken.token,
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should not get a delete account token with wrong user id and token', async () => {
    const createdUser = await userRepository.createUser(userData)

    await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: createdUser.id + 1,
      token: 'wrong-token',
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should remove a delete account token', async () => {
    const createdUser = await userRepository.createUser(userData)

    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const deletedAccountToken = await deleteAccountTokenRepository.removeDeleteAccountToken({
      userId: createdUser.id,
      token: createdDeleteAccountToken.token,
    })

    expect(deletedAccountToken).toBeDefined()
  })

  it('should not remove a delete account token with wrong token', async () => {
    const createdUser = await userRepository.createUser(userData)

    await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: createdUser.id,
    })

    const removedDeleteAccount = await deleteAccountTokenRepository.removeDeleteAccountToken({
      userId: createdUser.id,
      token: 'wrong-token',
    })

    expect(removedDeleteAccount).toBeUndefined()
  })
})
