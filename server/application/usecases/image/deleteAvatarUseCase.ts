import { getInjection } from '~~/server/di/container'
import type { Image } from '~~/server/entities/imageEntity'

export const deleteAvatarUseCase = async (avatar: string): Promise<Image | undefined> => {
  const imageService = getInjection('IImageService')
  const blob = await imageService.deleteAvatar(avatar)
  return blob
}
