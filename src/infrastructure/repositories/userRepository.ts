import { eq } from 'drizzle-orm'
import type { IUserRepository } from '@@/src/application/repositories'
import { injectable } from 'inversify'
import { startSpan, captureException } from '@sentry/nuxt'
import type { User } from '~~/src/entities/models/user'

@injectable()
export class UserRepository implements IUserRepository {
  createUser = async ({
    email,
    name,
  }: {
    email: string
    name: string
  }): Promise<User> => {
    return await startSpan(
      {
        name: 'UserRepository > createUser',
      },
      async () => {
        try {
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
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  createMagicUser = async ({
    email,
  }: {
    email: string
  }): Promise<User> => {
    return await startSpan(
      {
        name: 'UserRepository > createMagicUser',
      },
      async () => {
        let name = email.split('@')[0] ?? ''

        // replace all non-alphanumeric characters with space
        name = name.replace(/[^a-zA-Z0-9]/g, ' ')

        //  uppercasing the first letter of each word
        name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        try {
          const user = await useDrizzle().insert(tables.users).values({
            name,
            email,
          }).returning().get()

          if (!user) {
            throw new Error('Failed to create magic user')
          }

          return user
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  getUser = async (userId: number) => {
    return await startSpan(
      {
        name: 'UserRepository > getUser',
      },
      async () => {
        try {
          return await useDrizzle().select().from(tables.users).where(eq(tables.users.id, userId)).get()
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  getUserByEmail = async (email: string) => {
    return await startSpan(
      {
        name: 'UserRepository > getUserByEmail',
      },
      async () => {
        try {
          const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email)).get()

          return user
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  updateUser = async ({
    userId,
    updatedUser,
  }: {
    userId: number
    updatedUser: Partial<User>
  }): Promise<User> => {
    return await startSpan(
      {
        name: 'UserRepository > updateUser',
      },
      async () => {
        try {
          return await useDrizzle().update(tables.users).set(updatedUser).where(eq(tables.users.id, userId)).returning().get()
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  deleteUser = async ({ userId }: { userId: number }) => {
    return await startSpan(
      {
        name: 'UserRepository > deleteUser',
      },
      async () => {
        try {
          const user = await useDrizzle().delete(tables.users).where(eq(tables.users.id, userId)).returning().get()

          return user
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }
}
