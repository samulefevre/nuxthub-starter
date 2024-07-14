import type { IUserRepository, IMagicLinkRepository } from '@@/server/domain/repositories'

interface ILoginWithMagicLink {
  token: string
}

export class LoginWithMagicLinkUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly magicLinkRepository: IMagicLinkRepository,
  ) { }

  async execute({
    token,
  }: ILoginWithMagicLink) {
    const existingMagicLink = await this.magicLinkRepository.getMagicLinkByToken(token)

    if (!existingMagicLink) {
      throw new Error('Magic link not found')
    }

    if (existingMagicLink.tokenExpiresAt < new Date()) {
      await this.magicLinkRepository.deleteMagicLink(token)
      throw new Error('Magic link expired')
    }

    const user = await this.userRepository.getUserByEmail(existingMagicLink.email)

    if (user) {
      await this.magicLinkRepository.deleteMagicLink(token)
      return user
    }
    else {
      const newUser = await this.userRepository.createMagicUser({
        email: existingMagicLink.email,
      })

      await this.magicLinkRepository.deleteMagicLink(token)

      return newUser
    }
  }
}
