import { getFileFromUrlUseCase, saveAvatarUseCase } from '~~/server/application/usecases/image'
import { createUserUseCase, getUserByEmailUseCase, updateUserUseCase } from '~~/server/application/usecases/user'
import { createUserSchema, type CreateUserInput } from '~~/server/entities/models/user'

export async function signInController(input: CreateUserInput): Promise<User> {
  const { data, error } = createUserSchema.safeParse(input)

  if (error) {
    throw new Error(error.name, { cause: error })
  }

  const existingUser = await getUserByEmailUseCase(data.email)

  /* if (!existingUser) {
    existingUser = await createUserUseCase({ email: data.email, name: data.name })

    if (!data.avatarUrl) {
      return existingUser
    }

    const file = await getFileFromUrlUseCase(data.avatarUrl)

    if (file) {
      const blob = await saveAvatarUseCase({
        file,
        userId: existingUser.id,
      })

      if (!blob) {
        return existingUser
      }

      const avatar = blob.pathname

      existingUser = await updateUserUseCase({
        userId: existingUser.id,
        updatedUser: {
          avatar,
        },
      })

      if (!existingUser) {
        throw new Error('User not found')
      }
    }
  } */

  return existingUser
}
