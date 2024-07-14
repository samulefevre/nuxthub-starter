import { randomUUID } from 'uncrypto'
import { hubBlob } from '@nuxthub/core/dist/runtime/blob/server/utils/blob'
import type { IUserRepository } from '../repositories'

export class UpdateAvatarUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute({ file, userId, currentAvatar }: { file: File, userId: number, currentAvatar?: string }) {
    const fileName = `avatar-${randomUUID()}`

    if (currentAvatar) {
      console.log('Deleting current avatar', currentAvatar)
      await hubBlob().delete(currentAvatar)
    }

    // TODO: Add this to the image repository
    const blob = await hubBlob().put(fileName, file, {
      addRandomSuffix: false,
      prefix: `${userId}`,
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
