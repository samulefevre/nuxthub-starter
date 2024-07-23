import type { Image } from '@@/server/entities/imageEntity'

export interface IImageService {
  saveAvatar({
    file,
    userId,
  }: {
    file: File
    userId: number
  }): Promise<Image>
  deleteAvatar(pathname: string): Promise<Image>
  getFileFromUrl(url: string): Promise<File | undefined>
}
