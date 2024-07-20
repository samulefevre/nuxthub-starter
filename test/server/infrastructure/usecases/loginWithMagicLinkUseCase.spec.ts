import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '@@/server/database/schema'
import SQLiteDB from 'better-sqlite3'

import type { Database } from 'better-sqlite3'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { DrizzleMagicLinkRepository, DrizzleUserRepository } from '~~/server/application/repositories'
import { LoginWithMagicLinkUseCase, SendMagicLinkUseCase } from '~~/server/infrastructure/usecases'
import type { IEmailService } from '~~/server/infrastructure/services'

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
  let userRepository: DrizzleUserRepository

  let sendMagicLinkUseCase: SendMagicLinkUseCase
  let loginWithMagicLinkUseCase: LoginWithMagicLinkUseCase

  let sqlite: Database

  beforeEach(() => {
    sqlite = new SQLiteDB(':memory:')
    db = drizzle(sqlite, { schema })

    migrate(db, { migrationsFolder: 'server/database/migrations' })

    magicLinkRepository = new DrizzleMagicLinkRepository(db)
    userRepository = new DrizzleUserRepository(db)

    sendMagicLinkUseCase = new SendMagicLinkUseCase({
      magicLinkRepository,
      emailService: mockEmailService,
    })

    loginWithMagicLinkUseCase = new LoginWithMagicLinkUseCase(
      userRepository,
      magicLinkRepository,
    )
  })

  afterEach(() => {
    sqlite.close()
  })

  it('should login with magic link', async () => {
    const magicLinkSent = await sendMagicLinkUseCase.execute({
      email: userData.email,
    })

    expect(magicLinkSent).toBeDefined()

    const magicLink = await magicLinkRepository.getMagicLinkByEmail(userData.email)

    expect(magicLink).toBeDefined()
    expect(magicLink!.token).toBeDefined()

    const user = await loginWithMagicLinkUseCase.execute({
      token: magicLink!.token,
    })

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
  })

  it('should not login with invalid magic link', async () => {
    const magicLinkSent = await sendMagicLinkUseCase.execute({
      email: userData.email,
    })

    expect(magicLinkSent).toBeDefined()

    try {
      await loginWithMagicLinkUseCase.execute({
        token: 'invalid-token',
      })
    }
    catch (e) {
      expect((e as Error).message).toBe('Magic link not found')
    }
  })
})
