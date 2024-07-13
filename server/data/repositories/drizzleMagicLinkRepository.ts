import { randomUUID } from 'uncrypto'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import type * as schema from '@@/server/database/schema'
import * as tables from '@@/server/database/schema'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { eq } from 'drizzle-orm'
import type { IMagicLinkRepository } from '@@/server/domain/repositories/IMagicLinkRepository'

export class DrizzleMagicLinkRepository implements IMagicLinkRepository {
  private _db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>

  constructor(db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>) {
    this._db = db
  }

  async getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    const magicLink = await this._db.select().from(tables.magicLinks).where(eq(tables.magicLinks.token, token)).get()

    return magicLink
  }

  async upsertMagicLink(email: string): Promise<MagicLink | undefined> {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    const magicLink = await this._db.insert(tables.magicLinks).values({
      email,
      token,
      tokenExpiresAt,
    }).onConflictDoUpdate({
      target: tables.magicLinks.email,
      set: {
        token,
        tokenExpiresAt,
      },
    }).returning().get()

    return magicLink
  }

  async deleteMagicLink(email: string): Promise<MagicLink | undefined> {
    const magicLink = await this._db.delete(tables.magicLinks).where(eq(tables.magicLinks.email, email)).returning().get()

    return magicLink
  }
}
