import { useUsersApi } from '../utils/useUsersApi'

export function useSettings() {
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
      await useUsersApi().updateAvatar(image)

      toast.add({
        title: 'Your avatar has been updated',
      })
    }
    catch (error) {
      toast.add({
        title: (error as Error).message,
        color: 'error',
      })
    }

    await refreshSession()
  })

  const sendDeleteAccountEmail = async () => {
    try {
      await useUsersApi().sendDeleteAccountEmail()

      toast.add({
        title: 'Delete account email has been sent',
      })
    }
    catch (error) {
      toast.add({
        title: (error as Error).message,
        color: 'error',
      })
    }
  }

  const confirmDeleteAccount = async ({ token }: { token: string }) => {
    try {
      await useUsersApi().confirmDeleteAccount({ token })

      await clear()
      await navigateTo('/')

      toast.add({
        title: 'Your account has been deleted',
      })
    }
    catch (error) {
      toast.add({
        title: (error as Error).message,
        color: 'error',
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
