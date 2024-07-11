import { randomUUID } from 'uncrypto'
import type { MagicLinkRepository } from './magicLinkRepository'

export class DrizzleMagicLinkRepository implements MagicLinkRepository {
  async getMagicLink(email: string): Promise<MagicLink | undefined> {
    return await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.email, email)).get()
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