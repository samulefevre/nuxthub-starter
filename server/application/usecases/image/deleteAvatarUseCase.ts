import type { Image } from '~~/server/entities/imageEntity'

export const deleteAvatarUseCase = async (avatar: string): Promise<Image | undefined> => {
  const blob = await resolve('imageService').deleteAvatar(avatar)
  return blob
}
