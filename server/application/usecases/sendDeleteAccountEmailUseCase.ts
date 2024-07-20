import type { IDeleteAccountTokenRepository, IUserRepository } from '@@/server/domain/repositories'
import type { IEmailService } from '@@/server/domain/services'

interface ISendDeleteAccountEmail {
  userId: number
}

export class SendDeleteAccountEmailUseCase {
  private readonly userRepository: IUserRepository
  private readonly deleteAccountTokenRepository: IDeleteAccountTokenRepository
  private readonly emailService: IEmailService

  constructor({
    userRepository,
    deleteAccountTokenRepository,
    emailService,
  }: {
    userRepository: IUserRepository
    deleteAccountTokenRepository: IDeleteAccountTokenRepository
    emailService: IEmailService
  }) {
    this.userRepository = userRepository
    this.deleteAccountTokenRepository = deleteAccountTokenRepository
    this.emailService = emailService
  }

  async execute({ userId }: ISendDeleteAccountEmail) {
    const user = await this.userRepository.getUser(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const deleteAccountToken = await this.deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: user.id,
    })

    if (!deleteAccountToken) {
      throw new Error('Delete account token not created')
    }

    return await this.emailService.sendDeleteAccountEmail({
      email: user.email,
      token: deleteAccountToken.token,
    })
  }
}
