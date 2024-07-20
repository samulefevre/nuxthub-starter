import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { DrizzleUserRepository } from '~~/server/application/repositories'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleUserRepository', () => {
  let db: BetterSQLite3Database<typeof schema>
  let repository: DrizzleUserRepository

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    repository = new DrizzleUserRepository(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should create a new user', async () => {
    const createdUser = await repository.createUser(userData)

    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)
  })

  it('should create a new magic user', async () => {
    const createdUser = await repository.createMagicUser({
      email: userData.email,
    })

    expect(createdUser.email).toEqual(userData.email)
  })

  it('should find a user by id', async () => {
    const createdUser = await repository.createUser(userData)

    const user = await repository.getUser(createdUser.id)

    expect(user!.id).toEqual(createdUser.id)
    expect(user!.email).toEqual(userData.email)
    expect(user!.name).toEqual(userData.name)
  })

  it('should find a user by email', async () => {
    await repository.createUser(userData)

    const user = await repository.getUserByEmail(userData.email)

    expect(user!.email).toEqual(userData.email)
    expect(user!.name).toEqual(userData.name)
  })

  it('should update a user', async () => {
    const createdUser = await repository.createUser(userData)

    const updatedUser = {
      name: 'Updated Name',
      email: 'newemail@test.gg',
    }

    const updatedUserDatas = await repository.updateUser({
      userId: createdUser.id,
      updatedUser,
    })

    expect(updatedUserDatas.id).toEqual(createdUser.id)
    expect(updatedUserDatas.name).toEqual(updatedUser.name)
    expect(updatedUserDatas.email).toEqual(updatedUser.email)
  })

  it('should delete a user', async () => {
    const createdUser = await repository.createUser(userData)

    await repository.deleteUser({ userId: createdUser.id })

    const user = await repository.getUser(createdUser.id)

    expect(user).toBeUndefined()
  })
})
