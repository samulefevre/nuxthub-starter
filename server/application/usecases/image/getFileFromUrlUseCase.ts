import { getInjection } from '~~/server/di/container'

export const getFileFromUrlUseCase = async (url: string): Promise<File | undefined> => {
  const imageService = getInjection('IImageService')
  const file = await imageService.getFileFromUrl(url)
  return file
}
