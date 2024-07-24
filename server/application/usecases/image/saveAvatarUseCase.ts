import type { Image } from '~~/server/entities/imageEntity'

export const saveAvatarUseCase = async ({ file, userId }: { file: File, userId: number }): Promise<Image | undefined> => {
  const blob = await useContainer().resolve('imageService').saveAvatar({
    file,
    userId,
  })
  return blob
}
