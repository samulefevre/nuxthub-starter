import { describe, it, expect, beforeAll, afterAll } from 'vitest'

import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { DrizzleUserRepository } from '~~/server/data/repositories'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleUserRepository', () => {
  let db: BetterSQLite3Database<typeof schema>
  let repository: DrizzleUserRepository

  let sqlite: Database

  beforeAll(() => {
    const sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    repository = new DrizzleUserRepository(db)
  })

  afterAll(() => {
    sqlite.close()
  })

  it('should create a new user', async () => {
    const createdUser = await repository.createUser(userData)

    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)
  })
})
