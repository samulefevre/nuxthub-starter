import { randomUUID } from 'uncrypto'
import type { IMagicLinkRepository } from '../../domain/repositories/IMagicLinkRepository'

export class DrizzleMagicLinkRepository implements IMagicLinkRepository {
  async getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    const magicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.token, token)).get()

    return magicLink
  }

  async upsertMagicLink(email: string): Promise<string> {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    await useDrizzle().insert(tables.magicLinks).values({
      email,
      token,
      tokenExpiresAt,
    }).onConflictDoUpdate({
      target: tables.magicLinks.email,
      set: {
        token,
        tokenExpiresAt,
      },
    })

    return token
  }

  async deleteMagicLink(email: string): Promise<void> {
    await useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.email, email)).returning().get()
  }
}
