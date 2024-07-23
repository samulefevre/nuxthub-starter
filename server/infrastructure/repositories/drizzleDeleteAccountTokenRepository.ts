import { randomUUID } from 'uncrypto'
import * as tables from '@@/server/database/schema'
import { eq, and } from 'drizzle-orm'
import type { IDeleteAccountTokenRepository } from '@@/server/application/repositories'

export class DrizzleDeleteAccountTokenRepository implements IDeleteAccountTokenRepository {
  upsertDeleteAccountToken = async ({
    userId,
  }: {
    userId: number
  }) => {
    const token = randomUUID()
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

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

  getDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    const deleteAccountToken = await useDrizzle().select().from(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).get()

    return deleteAccountToken
  }

  removeDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    const deleteAccountToken = await useDrizzle().delete(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).returning().get()

    return deleteAccountToken
  }
}
