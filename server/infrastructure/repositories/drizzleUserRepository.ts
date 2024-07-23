import * as tables from '@@/server/database/schema'

import { eq } from 'drizzle-orm'
import type { IUserRepository } from '@@/server/application/repositories'

export class DrizzleUserRepository implements IUserRepository {
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
    // const name = email.split('@')[0].split('.')[0]

    // replace all non-alphanumeric characters with space
    // name.replace(/[^a-zA-Z0-9]/g, ' ')

    //  uppercasing the first letter of each word
    // name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    if (!email) {
      throw new Error('Email is required')
    }

    const user = await useDrizzle().insert(tables.users).values({
      name: email.split('@')[0],
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
    const user = useDrizzle().select().from(tables.users).where(eq(tables.users.email, email)).get()

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
    const user = useDrizzle().delete(tables.users).where(eq(tables.users.id, userId)).returning().get()

    return user
  }
}
