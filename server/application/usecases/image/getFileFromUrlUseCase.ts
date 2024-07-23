export const getFileFromUrlUseCase = async (url: string): Promise<File | undefined> => {
  const file = await resolve('imageService').getFileFromUrl(url)
  return file
}
