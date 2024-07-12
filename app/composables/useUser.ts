import { FetchError } from 'ofetch'

export function useUser() {
  const { fetch: refreshSession, clear } = useUserSession()

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
      await userRepository.updateAvatar(image)

      toast.add({
        title: 'Your avatar has been updated',
      })
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

  const sendDeleteAccountEmail = async () => {
    try {
      await userRepository.sendDeleteAccountEmail()
      toast.add({
        title: 'Delete account email has been sent',
      })
    }
    catch (error) {
      toast.add({
        title: 'Failed to send delete account email',
        color: 'red',
      })
    }
  }

  const confirmDeleteAccount = async ({ token }: { token: string }) => {
    try {
      await userRepository.deleteAccount({ token })

      // await clear()
      // await navigateTo('/')

      toast.add({
        title: 'Your account has been deleted',
      })
    }
    catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: error.data.message,
          color: 'red',
        })
      }

      toast.add({
        title: 'Failed to delete account2',
        color: 'red',
      })
    }
  }

  return {
    chooseFile,
    files,
    sendDeleteAccountEmail,
    confirmDeleteAccount,
  }
}
