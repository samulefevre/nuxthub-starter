import { randomUUID } from 'uncrypto'

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

  const updatedUser = await userRepository.updateAvatarPath({
    userId: userId,
    avatarPath: blob.pathname,
  })

  return {
    updatedUser,
    blob,
  }
}
