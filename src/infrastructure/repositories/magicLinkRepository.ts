import { randomUUID } from 'uncrypto'
import { eq } from 'drizzle-orm'
import type { IMagicLinkRepository } from '@@/src/application/repositories'
import { injectable } from 'inversify'
import type { MagicLink } from '~~/src/entities/models/magicLink'

@injectable()
export class MagicLinkRepository implements IMagicLinkRepository {
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

  async deleteMagicLink(token: string): Promise<MagicLink | undefined> {
    const magicLink = await useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.token, token)).returning().get()

    return magicLink
  }
}
