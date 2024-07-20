import type { Image } from '@@/server/domain/entities/imageEntity'

export interface IImageRepository {
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
