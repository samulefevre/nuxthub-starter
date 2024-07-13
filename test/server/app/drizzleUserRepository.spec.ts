import { describe, it, expect, beforeAll } from 'vitest'

import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import Database from 'better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { DrizzleUserRepository } from '~~/server/data/repositories'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleUserRepository', () => {
  let db: BetterSQLite3Database<typeof schema>
  let repository: DrizzleUserRepository

  beforeAll(() => {
    const sqlite = new Database(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    repository = new DrizzleUserRepository(db)
  })

  it('should create a new user', async () => {
    const createdUser = await repository.createUser(userData)

    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)

    /*  await expect(repository.createUser(userData)).rejects.toThrow('Failed to create user') */
  })
})
