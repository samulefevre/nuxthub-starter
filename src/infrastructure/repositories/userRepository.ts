import { eq } from 'drizzle-orm'
import type { IUserRepository } from '@@/src/application/repositories'
import { injectable } from 'inversify'
import type { User } from '~~/src/entities/models/user'

@injectable()
export class UserRepository implements IUserRepository {
  createUser = async ({
    email,
    name,
  }: {
    email: string
    name: string
  }) => {
    const user = await useDrizzle().insert(tables.users).values({
      name,
      email,
    }).onConflictDoUpdate({
      target: tables.users.email,
      set: {
        lastLogin: new Date(),
      },
    }).returning().get()

    return user
  }

  createMagicUser = async ({
    email,
  }: {
    email: string
  }) => {
    let name = email.split('@')[0] ?? ''

    // replace all non-alphanumeric characters with space
    name = name.replace(/[^a-zA-Z0-9]/g, ' ')

    //  uppercasing the first letter of each word
    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const user = await useDrizzle().insert(tables.users).values({
      name,
      email,
    }).returning().get()

    if (!user) {
      throw new Error('Failed to create magic user')
    }

    return user
  }

  getUser = async (userId: number) => {
    return await useDrizzle().select().from(tables.users).where(eq(tables.users.id, userId)).get()
  }

  getUserByEmail = async (email: string) => {
    const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email)).get()

    return user
  }

  updateUser = async ({
    userId,
    updatedUser,
  }: {
    userId: number
    updatedUser: Partial<User>
  }) => {
    return await useDrizzle().update(tables.users).set(updatedUser).where(eq(tables.users.id, userId)).returning().get()
  }

  deleteUser = async ({ userId }: { userId: number }) => {
    const user = await useDrizzle().delete(tables.users).where(eq(tables.users.id, userId)).returning().get()

    return user
  }
}
