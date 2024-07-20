import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { DrizzleMagicLinkRepository } from '~~/server/infrastructure/repositories'
import { SendMagicLinkUseCase } from '~~/server/application/usecases'
import type { IEmailService } from '~~/server/application/services'

describe('magicLinks usecases', () => {
  const userData = { email: 'test@example.com', name: 'Test User', avatarUrl: 'https://example.com/avatar.png' }

  vi.mock('@@/server/utils/email', () => ({
    useEmail: vi.fn().mockImplementation(() => ({
      sendMagicLink: vi.fn().mockResolvedValue({ ok: true }),
    })),
  }))

  const mockEmailService: IEmailService = {
    sendMagicLink: async () => ({ ok: true }),
    sendDeleteAccountEmail: async () => ({ ok: true }),
  }

  let db: BetterSQLite3Database<typeof schema>
  let magicLinkRepository: DrizzleMagicLinkRepository

  let sendMagicLinkUseCase: SendMagicLinkUseCase

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    magicLinkRepository = new DrizzleMagicLinkRepository(db)
    sendMagicLinkUseCase = new SendMagicLinkUseCase({
      magicLinkRepository,
      emailService: mockEmailService,
    })
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should send a new magic link', async () => {
    const magicLinkSent = await sendMagicLinkUseCase.execute({
      email: userData.email,
    })

    expect(magicLinkSent).toBeDefined()
  })
})
