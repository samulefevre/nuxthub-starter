import { FetchError } from 'ofetch'

export class UserApi {
  async updateAvatar(avatar: File): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('file', avatar)

      const res = await $fetch(`/api/users/updateAvatar`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Failed to update avatar')
      }
    }
    catch (error) {
      if (error instanceof FetchError) {
        throw createError({
          statusCode: error.statusCode,
          message: error.data.message,
        })
      }

      throw createError({
        statusCode: 500,
        message: 'Failed to update avatar',
      })
    }
  }

  async sendDeleteAccountEmail(): Promise<void> {
    try {
      await $fetch(`/api/users/sendDeleteAccountEmail`, {
        method: 'POST',
      })
    }
    catch (error) {
      throw new Error('Failed to send delete account email')
    }
  }

  async deleteAccount({ token }: { token: string }): Promise<void> {
    return $fetch('/api/users/deleteAccount', {
      method: 'POST',
      body: {
        token,
      },
    })
  }
}
