import { randomUUID } from 'uncrypto'
import { eq, and } from 'drizzle-orm'
import type { IDeleteAccountTokenRepository } from '@@/src/application/repositories'
import { injectable } from 'inversify'
import { startSpan, captureException } from '@sentry/nuxt'
import { UnexpectedError } from '~~/src/entities/errors/common'

@injectable()
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
          const deleteAccount = await useDrizzle().insert(tables.deleteAccountTokens).values({
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
          const deleteAccountToken = await useDrizzle().select().from(tables.deleteAccountTokens).where(
            and(
              eq(tables.deleteAccountTokens.token, token),
              eq(tables.deleteAccountTokens.userId, userId),
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
          const deleteAccountToken = await useDrizzle().delete(tables.deleteAccountTokens).where(
            and(
              eq(tables.deleteAccountTokens.token, token),
              eq(tables.deleteAccountTokens.userId, userId),
            )).returning().get()

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
