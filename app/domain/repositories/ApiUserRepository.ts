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
        throw createError({
          statusCode: 500,
          message: 'Failed to update avatar',
        })
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
}
