export const getFileFromUrlUseCase = async (url: string): Promise<File | undefined> => {
  const file = await useContainer().resolve('imageService').getFileFromUrl(url)
  return file
}
