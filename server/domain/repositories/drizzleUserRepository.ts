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
}
