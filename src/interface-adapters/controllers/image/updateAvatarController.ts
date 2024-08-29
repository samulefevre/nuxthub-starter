import { startSpan } from '@sentry/nuxt'
import { deleteAvatarUsecase, saveAvatarUsecase } from '~~/src/application/usecases/image'
import { getUserUsecase, updateUserUsecase } from '~~/src/application/usecases/user'

interface IUpdateAvatar {
  file: File
  userId: number
}

export async function updateAvatarController({ file, userId }: IUpdateAvatar) {
  return await startSpan(
    {
      name: 'updateAvatar Controller',
    },
    async () => {
      console.log('updateAvatar Controller')

      const user = await getUserUsecase(userId)

      if (!user) {
        throw new Error('User not found')
      }

      if (user.avatar) {
        await deleteAvatarUsecase(user.avatar)
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

      return {
        updatedUser,
        blob,
      }
    })
}
