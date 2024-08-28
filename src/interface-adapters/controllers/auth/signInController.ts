import { getFileFromUrlUsecase, saveAvatarUsecase } from '~~/src/application/usecases/image'
import { createUserUsecase, getUserByEmailUsecase, updateUserUsecase } from '~~/src/application/usecases/user'
import type { User, CreateUserInput } from '~~/src/entities/models/user'

import { createUserSchema } from '~~/src/entities/models/user'

export async function signInController(input: CreateUserInput): Promise< User> {
  const { data, error } = createUserSchema.safeParse(input)

  if (error) {
    throw new Error(error.name, { cause: error })
  }

  let existingUser = await getUserByEmailUsecase(data.email)

  if (!existingUser) {
    existingUser = await createUserUsecase({ email: data.email, name: data.name })

    if (!data.avatarUrl) {
      return existingUser!
    }

    const file = await getFileFromUrlUsecase(data.avatarUrl)

    if (file) {
      const blob = await saveAvatarUsecase({
        file,
        userId: existingUser!.id,
      })

      if (!blob) {
        return existingUser!
      }

      const avatar = blob.pathname

      existingUser = await updateUserUsecase({
        userId: existingUser!.id,
        updatedUser: {
          avatar,
        },
      })

      if (!existingUser) {
        throw new Error('User not found')
      }
    }
  }

  return existingUser!
}
