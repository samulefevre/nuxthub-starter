import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { DrizzleMagicLinkRepository } from '~~/server/application/repositories'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleMagicLinkRepository', () => {
  let db: BetterSQLite3Database<typeof schema>
  let repository: DrizzleMagicLinkRepository

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    repository = new DrizzleMagicLinkRepository(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should create a magic link', async () => {
    const token = await repository.upsertMagicLink(userData.email)

    expect(token).toBeDefined()
  })

  it('should get a magic link by token', async () => {
    const newMagicLink = await repository.upsertMagicLink(userData.email)

    const magicLink = await repository.getMagicLinkByToken(newMagicLink!.token)

    expect(magicLink).toBeDefined()
  })

  it('should delete a magic link', async () => {
    const newMagicLink = await repository.upsertMagicLink(userData.email)

    await repository.deleteMagicLink(userData.email)

    const magicLink = await repository.getMagicLinkByToken(newMagicLink!.token)

    expect(magicLink).toBeUndefined()
  })

  it('should not delete a magic link if email does not exist', async () => {
    const newMagicLink = await repository.upsertMagicLink(userData.email)

    const magicLink = await repository.deleteMagicLink('bad-email')

    expect(magicLink).toBeUndefined()

    const existingMagicLink = await repository.getMagicLinkByToken(newMagicLink!.token)

    expect(existingMagicLink).toBeDefined()
  })

  it('should update a magic link', async () => {
    const newMagicLink = await repository.upsertMagicLink(userData.email)

    const newToken = await repository.upsertMagicLink(userData.email)

    expect(newToken).not.toBe(newMagicLink!.token)
  })

  it('should not update a magic link if email does not exist', async () => {
    const newMagicLink = await repository.upsertMagicLink(userData.email)

    const upsertedMagicLink = await repository.upsertMagicLink('bad-email')

    expect(upsertedMagicLink!.token).not.toBe(newMagicLink!.token)
  })
})
