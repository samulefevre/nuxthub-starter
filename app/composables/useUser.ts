import { FetchError } from 'ofetch'
import type { UserRepository } from '~/domain/repositories/UserRepository'

export function useUser() {
  const userRepository = useNuxtApp().$userRepository as UserRepository
  const { fetch: refreshSession } = useUserSession()

  const toast = useToast()

  const { files, open: chooseFile, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
  })

  onChange(async (files) => {
    if (!files) {
      return
    }

    const image = files.item(0) as File

    try {
      const res = await userRepository.updateAvatar(image)
      if (res.ok) {
        toast.add({
          title: 'Your avatar has been updated',
        })
      }
    }
    catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: error.data.message,
          color: 'red',
        })

        return
      }

      if (error instanceof Error) {
        toast.add({
          title: 'Failed to update avatar',
          description: error.message,
          color: 'red',
        })

        return
      }
    }
    await refreshSession()
  })

  return {
    chooseFile,
    files,
  }
}
