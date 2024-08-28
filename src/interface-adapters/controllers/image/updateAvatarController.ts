import { startSpan } from '@sentry/nuxt'
import { deleteAvatarUsecase, saveAvatarUsecase } from '~~/src/application/usecases/image'
import { updateUserUsecase } from '~~/src/application/usecases/user'

interface IUpdateAvatar {
  file: File
  userId: number
  currentAvatar?: string
}

export async function updateAvatarController({ file, userId, currentAvatar }: IUpdateAvatar) {
  return await startSpan(
    {
      name: 'updateAvatar Controller',
    },
    async () => {
      console.log('updateAvatar Controller')
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
    })
}
