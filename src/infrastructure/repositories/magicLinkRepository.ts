import { randomUUID } from 'uncrypto'
import { eq } from 'drizzle-orm'
import type { IMagicLinkRepository } from '@@/src/application/repositories'
import { startSpan, captureException } from '@sentry/nuxt'
import type { MagicLink } from '~~/src/entities/models/magicLink'
import { DatabaseOperationError, UnexpectedError } from '~~/src/entities/errors/common'

import { db, schema } from 'hub:db'

export class MagicLinkRepository implements IMagicLinkRepository {
  async getMagicLinkByEmail(email: string): Promise<MagicLink | undefined> {
    return await startSpan(
      {
        name: 'MagicLinkRepository > getMagicLinkByEmail',
      },
      async () => {
        try {
          const magicLink = await db.select().from(schema.magicLinks).where(eq(schema.magicLinks.email, email)).get()

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
          const magicLink = await db.select().from(schema.magicLinks).where(eq(schema.magicLinks.token, token)).get()

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
          const magicLink = await db.insert(schema.magicLinks).values({
            email,
            token,
            tokenExpiresAt,
          }).onConflictDoUpdate({
            target: schema.magicLinks.email,
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

  async deleteMagicLink(token: string): Promise<MagicLink> {
    return await startSpan(
      {
        name: 'MagicLinkRepository > deleteMagicLink',
      },
      async () => {
        try {
          const magicLink = await db.delete(schema.magicLinks).where(eq(schema.magicLinks.token, token)).returning().get()

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
