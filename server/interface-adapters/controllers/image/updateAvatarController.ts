import { deleteAvatarUsecase, saveAvatarUsecase } from '~~/server/application/usecases/image'
import { updateUserUsecase } from '~~/server/application/usecases/user'

interface IUpdateAvatar {
  file: File
  userId: number
  currentAvatar?: string
}

export async function updateAvatarController({ file, userId, currentAvatar }: IUpdateAvatar) {
  if (currentAvatar) {
    await deleteAvatarUsecase(currentAvatar)
  }

  const blob = await saveAvatarUsecase({
    file,
    userId,
  })

  if (!blob) {
    throw new Error('Failed to upload file')
  }

  const updatedUser = await updateUserUsecase({
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
