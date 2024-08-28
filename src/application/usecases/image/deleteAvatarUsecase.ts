import { getInjection } from '~~/di/container'
import type { Image } from '~~/src/entities/models/image'

export const deleteAvatarUsecase = async (avatar: string): Promise<Image | undefined> => {
  const imageService = getInjection('IImageService')
  const blob = await imageService.deleteAvatar(avatar)
  return blob
}
