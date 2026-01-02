import { eq } from 'drizzle-orm'
import type { IUserRepository } from '@@/src/application/repositories'

import { startSpan, captureException } from '@sentry/nuxt'
import type { User } from '~~/src/entities/models/user'
import { DatabaseOperationError, UnexpectedError } from '~~/src/entities/errors/common'

import { db, schema } from 'hub:db'

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
          const user = await db.insert(schema.users).values({
            name,
            email,
          }).onConflictDoUpdate({
            target: schema.users.email,
            set: {
              lastLogin: new Date(),
            },
          }).returning().get()

          return user
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
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
          const user = await db.insert(schema.users).values({
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
          throw new UnexpectedError()
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
          return await db.select().from(schema.users).where(eq(schema.users.id, userId)).get()
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
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
          const user = await db.select().from(schema.users).where(eq(schema.users.email, email)).get()

          return user
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
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
          const user = await db.update(schema.users).set(updatedUser).where(eq(schema.users.id, userId)).returning().get()

          return user
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
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
          const user = await db.delete(schema.users).where(eq(schema.users.id, userId)).returning().get()

          if (!user) {
            throw new DatabaseOperationError('Failed to delete user')
          }

          return user
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }
}
