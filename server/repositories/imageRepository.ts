import type { BlobObject } from '@nuxthub/core'

export interface ImageRepository {
  saveAvatar({
    file,
    userId,
  }: {
    file: File
    userId: number
  }): Promise<BlobObject>
  getFileFromUrl(url: string): Promise<File>
}
