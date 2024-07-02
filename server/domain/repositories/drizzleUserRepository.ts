import { randomUUID } from 'uncrypto'
import type { UserRepository } from './userRepository'

export class DrizzleUserRepository implements UserRepository {
  updateAvatarPath = async ({
    userId,
    avatarPath,
  }: {
    userId: number
    avatarPath: string
  }) => {
    return await useDrizzle().update(tables.users).set({
      avatar: avatarPath,
    }).where(eq(tables.users.id, userId)).returning().get()
  }

  getUser = async (userId: number) => {
    return await useDrizzle().select().from(tables.users).where(eq(tables.users.id, userId)).get()
  }

  deleteUser = async ({ userId }: { userId: number }) => {
    await useDrizzle().delete(tables.users).where(eq(tables.users.id, userId)).returning().get()
  }

  createDeleteAccountToken = async ({
    userId,
  }: {
    userId: number
  }) => {
    const token = randomUUID()

    await useDrizzle().insert(tables.deleteAccountTokens).values({
      token,
      userId,
    })

    return token
  }

  getDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    const deleteAccountToken = await useDrizzle().select().from(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).get()

    if (!deleteAccountToken) {
      throw new Error('Invalid token')
    }

    return token
  }

  removeDeleteAccountToken = async ({ userId, token }: { userId: number, token: string }) => {
    await useDrizzle().delete(tables.deleteAccountTokens).where(
      and(
        eq(tables.deleteAccountTokens.token, token),
        eq(tables.deleteAccountTokens.userId, userId),
      )).returning().get()
  }
}
