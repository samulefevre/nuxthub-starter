import { randomUUID } from 'uncrypto'
import { eq, and } from 'drizzle-orm'
import type { IDeleteAccountTokenRepository } from '@@/src/application/repositories'
import { startSpan, captureException } from '@sentry/nuxt'
import { DatabaseOperationError, UnexpectedError } from '~~/src/entities/errors/common'

import { db, schema } from 'hub:db'

export class DeleteAccountTokenRepository implements IDeleteAccountTokenRepository {
  upsertDeleteAccountToken = async ({
    userId,
  }: {
    userId: number
  }) => {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    return await startSpan(
      {
        name: 'DeleteAccountTokenRepository > upsertDeleteAccountToken',
      },
      async () => {
        try {
          const deleteAccount = await db.insert(schema.deleteAccountTokens).values({
            userId,
            token,
            tokenExpiresAt,
          }).onConflictDoUpdate({
            target: schema.deleteAccountTokens.userId,
            set: {
              token,
              tokenExpiresAt,
            },
          }).returning().get()

          return deleteAccount
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  getDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    return await startSpan(
      {
        name: 'DeleteAccountTokenRepository > getDeleteAccountToken',
      },
      async () => {
        try {
          const deleteAccountToken = await db.select().from(schema.deleteAccountTokens).where(
            and(
              eq(schema.deleteAccountTokens.token, token),
              eq(schema.deleteAccountTokens.userId, userId),
            )).get()

          return deleteAccountToken
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  removeDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    return await startSpan(
      {
        name: 'DeleteAccountTokenRepository > removeDeleteAccountToken',
      },
      async () => {
        try {
          const deleteAccountToken = await db.delete(schema.deleteAccountTokens).where(
            and(
              eq(schema.deleteAccountTokens.token, token),
              eq(schema.deleteAccountTokens.userId, userId),
            )).returning().get()

          if (!deleteAccountToken) {
            throw new DatabaseOperationError('DeleteAccountToken not found')
          }

          return deleteAccountToken
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }
}
