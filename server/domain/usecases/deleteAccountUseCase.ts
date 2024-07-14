import type { IDeleteAccountTokenRepository, IUserRepository } from '@@/server/domain/repositories'

interface IDeleteAccount {
  userId: number
  token: string
}

export class DeleteAccountUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deleteAccountTokenRepository: IDeleteAccountTokenRepository,
  ) { }

  async execute({ userId,
    token }: IDeleteAccount) {
    const verifiedToken = await this.deleteAccountTokenRepository.getDeleteAccountToken({ userId, token })

    if (!verifiedToken) {
      throw new Error('Token not found')
    }

    if (verifiedToken.tokenExpiresAt < new Date()) {
      await this.deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })
      throw new Error('Token expired')
    }

    const currentUser = await this.userRepository.getUser(userId)

    if (!currentUser) {
      throw new Error('User not found')
    }

    if (currentUser.avatar) {
      await hubBlob().delete(userId.toString())
    }

    await this.deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })

    const deletedUser = await this.userRepository.deleteUser({ userId })

    return deletedUser
  }
}
