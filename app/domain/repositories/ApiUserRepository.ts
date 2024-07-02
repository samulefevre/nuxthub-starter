import { FetchError } from 'ofetch'
import type { UserRepository } from './UserRepository'

export class ApiUserRepository implements UserRepository {
  async updateAvatar(avatar: File) {
    try {
      const formData = new FormData()
      formData.append('file', avatar)

      const res = await $fetch('/api/users/updateAvatar', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Failed to update avatar')
      }

      return res
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

  async sendDeleteAccountEmail() {
    try {
      await $fetch('/api/users/sendDeleteAccountEmail', {
        method: 'POST',
      })
    }
    catch (error) {
      throw new Error('Failed to send delete account email')
    }
  }

  async deleteAccount({ token }: { token: string }) {
    try {
      await $fetch('/api/users/deleteAccount', {
        method: 'POST',
        body: {
          token,
        },
      })
    }
    catch (error) {
      if (error instanceof FetchError) {
        throw new Error(error.data.message)
      }

      throw new Error('Failed to delete account')
    }
  }
}
