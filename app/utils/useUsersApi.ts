import type { FetchError } from 'ofetch'

export const useUsersApi = () => {
  const updateAvatar = async (avatar: File) => {
    try {
      const formData = new FormData()
      formData.append('file', avatar)

      return await $fetch(`/api/users/updateAvatar`, {
        method: 'POST',
        body: formData,
      })
    }
    catch (error) {
      throw createError({
        statusCode: (error as FetchError).statusCode,
        message: (error as FetchError).data.message,
      })
    }
  }

  const sendDeleteAccountEmail = async () => {
    try {
      await $fetch(`/api/users/sendDeleteAccountEmail`, {
        method: 'POST',
      })
    }
    catch (error) {
      throw createError({
        statusCode: (error as FetchError).statusCode,
        message: (error as FetchError).data.message,
      })
    }
  }

  const confirmDeleteAccount = async ({ token }: { token: string }) => {
    try {
      return await $fetch(`/api/users/deleteAccount`, {
        method: 'POST',
        body: JSON.stringify({ token }),
      })
    }
    catch (error) {
      throw createError({
        statusCode: (error as FetchError).statusCode,
        message: (error as FetchError).data.message,
      })
    }
  }

  const sendMagicLink = async (email: string) => {
    try {
      return await $fetch(`/auth/sendMagicLink`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
    }
    catch (error) {
      throw createError({
        statusCode: (error as FetchError).statusCode,
        message: (error as FetchError).data.message,
      })
    }
  }

  return {
    updateAvatar,
    sendDeleteAccountEmail,
    confirmDeleteAccount,
    sendMagicLink,
  }
}
