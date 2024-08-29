import { randomUUID } from 'uncrypto'
import { eq } from 'drizzle-orm'
import type { IMagicLinkRepository } from '@@/src/application/repositories'
import { injectable } from 'inversify'
import { startSpan, captureException } from '@sentry/nuxt'
import type { MagicLink } from '~~/src/entities/models/magicLink'
import { DatabaseOperationError, UnexpectedError } from '~~/src/entities/errors/common'

@injectable()
export class MagicLinkRepository implements IMagicLinkRepository {
  async getMagicLinkByEmail(email: string): Promise<MagicLink | undefined> {
    return await startSpan(
      {
        name: 'MagicLinkRepository > getMagicLinkByEmail',
      },
      async () => {
        try {
          const magicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.email, email)).get()

          return magicLink
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  async getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    return await startSpan(
      {
        name: 'MagicLinkRepository > getMagicLinkByToken',
      },
      async () => {
        try {
          const magicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.token, token)).get()

          return magicLink
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  async upsertMagicLink(email: string): Promise<MagicLink | undefined> {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    return await startSpan(
      {
        name: 'MagicLinkRepository > upsertMagicLink',
      },
      async () => {
        try {
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
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  async deleteMagicLink(token: string): Promise<MagicLink | undefined> {
    return await startSpan(
      {
        name: 'MagicLinkRepository > deleteMagicLink',
      },
      async () => {
        try {
          const magicLink = await useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.token, token)).returning().get()

          if (!magicLink) {
            throw new DatabaseOperationError('Failed to delete magic link')
          }

          return magicLink
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }
}
