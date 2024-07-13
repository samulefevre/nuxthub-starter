import { randomUUID } from 'uncrypto'
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

  getFileFromUrl = async (url: string) => {
    try {
      const res = await fetch(url)
      const resBlob = await res.blob()
      const fileExt = url.split('.').pop()

      const file = new File([resBlob], `avatar.${fileExt}`, { type: `image/${fileExt}` })

      return file
    }
    catch (error) {
      throw new Error('Failed to fetch file from url')
    }
  }
}
