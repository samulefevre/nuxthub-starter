import type { IDeleteAccountTokenRepository, IUserRepository } from '@@/server/domain/repositories'

import { useEmail } from '@@/server/utils/email'

interface ISendDeleteAccountEmail {
  userId: number
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}

export class SendDeleteAccountEmailUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deleteAccountTokenRepository: IDeleteAccountTokenRepository,
  ) { }

  async execute({ userId,
    resendApiKey,
    baseUrl,
    fromEmail }: ISendDeleteAccountEmail) {
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

    // TODO: email service
    return await useEmail({
      resendApiKey,
      baseUrl,
      fromEmail,
    }).sendDeleteAccountEmail({
      email: user.email,
      token: deleteAccountToken.token,
    })
  }
}
