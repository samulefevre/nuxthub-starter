import { randomUUID } from 'uncrypto'
import { hubBlob } from '@nuxthub/core/dist/runtime/blob/server/utils/blob'
import type { IImageService } from '@@/src/application/services'

import { startSpan, captureException } from '@sentry/nuxt'
import { UnexpectedError } from '~~/src/entities/errors/common'

export class ImageService implements IImageService {
  saveAvatar = async ({
    file,
    userId,
  }: {
    file: File
    userId: number
  }) => {
    return await startSpan(
      {
        name: 'ImageService > saveAvatar',
      },
      async () => {
        try {
          const fileName = `avatar-${randomUUID()}.png`
          const blob = await hubBlob().put(fileName, file, {
            addRandomSuffix: false,
            prefix: `${userId}`,
          })

          return blob
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  deleteAvatar = async (pathname: string) => {
    return await startSpan(
      {
        name: 'ImageService > deleteAvatar',
      },
      async () => {
        try {
          await hubBlob().delete(pathname)
          return { pathname }
        }
        catch (error) {
          captureException(error)
          throw new UnexpectedError()
        }
      },
    )
  }

  getFileFromUrl = async (url: string) => {
    return await startSpan(
      {
        name: 'ImageService > getFileFromUrl',
      },
      async () => {
        try {
          const res = await fetch(url)

          const contentType = res.headers.get('Content-Type')

          if (!contentType || !contentType.startsWith('image/')) {
            return undefined
          }

          if (!res) {
            return undefined
          }

          const blob = await res.arrayBuffer()

          const fileExt = url.split('.').pop()

          const file = new File([blob], `avatar.${fileExt}`, { type: `image/${fileExt}` })

          return file
        }
        catch (error) {
          captureException(error)
          return undefined
        }
      },
    )
  }
}
