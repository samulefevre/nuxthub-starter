import { getInjection } from '~~/di/container'
import type { Image } from '~~/src/entities/models/image'

export const saveAvatarUsecase = async ({ file, userId }: { file: File, userId: number }): Promise<Image | undefined> => {
  const imageService = getInjection('IImageService')
  const blob = await imageService.saveAvatar({
    file,
    userId,
  })
  return blob
}
