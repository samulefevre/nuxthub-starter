import { randomUUID } from 'uncrypto'
import type { IImageRepository, IUserRepository } from '../repositories'

interface ISignin {
  userRepository: IUserRepository
  imageRepository: IImageRepository
  email: string
  name: string
  avatarUrl?: string
}

export const signInUseCase = async ({
  userRepository,
  imageRepository,
  email,
  name,
  avatarUrl,
}: ISignin) => {
  let existingUser = await userRepository.getUserByEmail(email)

  if (!existingUser) {
    existingUser = await userRepository.createUser({ email, name })

    if (!avatarUrl) {
      return existingUser
    }

    const file = await imageRepository.getFileFromUrl(avatarUrl)

    if (file) {
      const blob = await imageRepository.saveAvatar({
        file,
        userId: existingUser.id,
      })

      const avatar = blob.pathname

      existingUser = await userRepository.updateUser({
        userId: existingUser.id,
        updatedUser: {
          avatar,
        },
      })

      if (!existingUser) {
        throw new Error('User not found')
      }
    }
  }

  return existingUser
}

interface IUpdateAvatar {
  userRepository: IUserRepository
  file: File
  userId: number
}

export const updateAvatarUseCase = async ({
  userRepository,
  file,
  userId,
}: IUpdateAvatar) => {
  const fileName = `avatar-${randomUUID()}`

  const currentUser = await userRepository.getUser(userId)

  if (!currentUser) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  if (currentUser.avatar) {
    await hubBlob().delete(currentUser.avatar)
  }

  const blob = await hubBlob().put(fileName, file, {
    addRandomSuffix: false,
    prefix: `${userId}`,
  })

  const updatedUser = await userRepository.updateUser({
    userId,
    updatedUser: {
      avatar: blob.pathname,
    },
  })

  if (!updatedUser) {
    throw new Error('User not found')
  }

  return {
    updatedUser,
    blob,
  }
}
