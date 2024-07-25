import { randomUUID } from 'uncrypto'
import * as tables from '@@/server/database/schema'
import { eq } from 'drizzle-orm'
import type { IMagicLinkRepository } from '@@/server/application/repositories'
import { injectable } from 'inversify'

@injectable()
export class DrizzleMagicLinkRepository implements IMagicLinkRepository {
  async getMagicLinkByEmail(email: string): Promise<MagicLink | undefined> {
    const magicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.email, email)).get()

    return magicLink
  }

  async getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    const magicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.token, token)).get()

    return magicLink
  }

  async upsertMagicLink(email: string): Promise<MagicLink | undefined> {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    const magicLink = await useDrizzle().insert(tables.magicLinks).values({
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
    const magicLink = await useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.email, email)).returning().get()

    return magicLink
  }
}
