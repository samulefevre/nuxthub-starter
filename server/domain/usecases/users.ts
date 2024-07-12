import { randomUUID } from 'uncrypto'

export const signInUseCase = async ({ email, name, avatarUrl }: { email: string, name: string, avatarUrl?: string }) => {
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
    }
  }

  return existingUser
}

export const updateAvatarUseCase = async (file: File, userId: number) => {
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

  return {
    updatedUser,
    blob,
  }
}
