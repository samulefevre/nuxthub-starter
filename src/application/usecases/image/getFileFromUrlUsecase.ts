import { getInjection } from '~~/di/ioc'

export const getFileFromUrlUsecase = async (url: string): Promise<File | undefined> => {
  const imageService = getInjection('IImageService')
  const file = await imageService.getFileFromUrl(url)
  return file
}
