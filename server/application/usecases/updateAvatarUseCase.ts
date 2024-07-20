import type { IImageRepository, IUserRepository } from '@@/server/domain/repositories'

interface IUpdateAvatar {
  file: File
  userId: number
  currentAvatar?: string
}

export class UpdateAvatarUseCase {
  constructor(
    private userRepository: IUserRepository,
    private imageRepository: IImageRepository,
  ) { }

  async execute({ file, userId, currentAvatar }: IUpdateAvatar) {
    if (currentAvatar) {
      await this.imageRepository.deleteAvatar(currentAvatar)
    }

    const blob = await this.imageRepository.saveAvatar({
      file,
      userId,
    })

    if (!blob.pathname) {
      throw new Error('Failed to upload file')
    }

    const updatedUser = await this.userRepository.updateUser({
      userId,
      updatedUser: {
        avatar: blob.pathname,
      },
    })

    if (!updatedUser) {
      throw new Error('User not updated')
    }

    return {
      updatedUser,
      blob,
    }
  }
}
