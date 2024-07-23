import { deleteAvatarUseCase, saveAvatarUseCase } from '~~/server/application/usecases/image'
import { updateUserUseCase } from '~~/server/application/usecases/user'

interface IUpdateAvatar {
  file: File
  userId: number
  currentAvatar?: string
}

export async function updateAvatarController({ file, userId, currentAvatar }: IUpdateAvatar) {
  if (currentAvatar) {
    await deleteAvatarUseCase(currentAvatar)
  }

  const blob = await saveAvatarUseCase({
    file,
    userId,
  })

  if (!blob) {
    throw new Error('Failed to upload file')
  }

  const updatedUser = await updateUserUseCase({
    userId,
    updatedUser: {
      avatar: blob.pathname,
    },
  })

  if (!updatedUser) {
    throw new Error('User not updated')
  }

  return {
    updatedUser,
    blob,
  }
}
