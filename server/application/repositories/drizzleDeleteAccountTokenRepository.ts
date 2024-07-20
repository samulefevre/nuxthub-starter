import { randomUUID } from 'uncrypto'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import type * as schema from '@@/server/database/schema'
import * as tables from '@@/server/database/schema'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { eq, and } from 'drizzle-orm'
import type { IDeleteAccountTokenRepository } from '@@/server/domain/repositories'

export class DrizzleDeleteAccountTokenRepository implements IDeleteAccountTokenRepository {
  private _db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>

  constructor(db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>) {
    this._db = db
  }

  upsertDeleteAccountToken = async ({
    userId,
  }: {
    userId: number
  }) => {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    const deleteAccount = await this._db.insert(tables.deleteAccountTokens).values({
      userId,
      token,
      tokenExpiresAt,
    }).onConflictDoUpdate({
      target: tables.deleteAccountTokens.userId,
      set: {
        token,
        tokenExpiresAt,
      },
    }).returning().get()

    return deleteAccount
  }

  getDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    const deleteAccountToken = await this._db.select().from(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).get()

    return deleteAccountToken
  }

  removeDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    const deleteAccountToken = await this._db.delete(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).returning().get()

    return deleteAccountToken
  }
}
