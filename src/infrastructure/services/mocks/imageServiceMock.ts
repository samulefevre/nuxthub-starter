import { injectable } from 'inversify'
import type { IImageService } from '~~/src/application/services'
import type { Image } from '~~/src/entities/models/image'

@injectable()
export class ImageServiceMock implements IImageService {
  saveAvatar({ file, userId }: { file: File, userId: number }): Promise<Image> {
    const newFileName = `avatar-fakeuuid`
    const fileExt = file.name.split('.').pop()
    const path = `/${userId}/${newFileName}.${fileExt}`

    return Promise.resolve({ pathname: path })
  }

  deleteAvatar(pathname: string): Promise<Image> {
    return Promise.resolve({ pathname })
  }

  getFileFromUrl(url: string): Promise<File | undefined> {
    const blob = new ArrayBuffer(8)
    const fileExt = url.split('.').pop()

    const file = new File([blob], `avatar.${fileExt}`, { type: `image/${fileExt}` })
    return Promise.resolve(file)
  }
}
