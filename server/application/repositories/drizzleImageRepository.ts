import { randomUUID } from 'uncrypto'
import { hubBlob } from '@nuxthub/core/dist/runtime/blob/server/utils/blob'
import type { IImageRepository } from '../../domain/repositories/IImageRepository'

export class DrizzleImageRepository implements IImageRepository {
  saveAvatar = async ({
    file,
    userId,
  }: {
    file: File
    userId: number
  }) => {
    const fileName = `avatar-${randomUUID()}`
    const blob = await hubBlob().put(fileName, file, {
      addRandomSuffix: false,
      prefix: `${userId}`,
    })

    return blob
  }

  deleteAvatar = async (pathname: string) => {
    await hubBlob().delete(pathname)
    return { pathname }
  }

  getFileFromUrl = async (url: string) => {
    try {
      const res = await $fetch.raw(url, { responseType: 'arrayBuffer' })

      const contentType = res.headers.get('Content-Type')

      if (!contentType || !contentType.startsWith('image/')) {
        return undefined
      }

      if (!res) {
        return undefined
      }

      const blob = res._data as ArrayBuffer

      const fileExt = url.split('.').pop()

      const file = new File([blob], `avatar.${fileExt}`, { type: `image/${fileExt}` })

      return file
    }
    catch (error) {
      return undefined
    }
  }
}
