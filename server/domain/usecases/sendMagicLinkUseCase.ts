import type { IMagicLinkRepository } from '@@/server/domain/repositories'

import type { IEmailService } from '@@/server/domain/services'

interface ISendMagicLink {
  email: string
}

export class SendMagicLinkUseCase {
  private readonly magicLinkRepository: IMagicLinkRepository
  private readonly emailService: IEmailService

  constructor({
    magicLinkRepository,
    emailService,
  }: {
    magicLinkRepository: IMagicLinkRepository
    emailService: IEmailService
  }) {
    this.magicLinkRepository = magicLinkRepository
    this.emailService = emailService
  }

  async execute({
    email,
  }: ISendMagicLink) {
    const newMagicLink = await this.magicLinkRepository.upsertMagicLink(email)

    if (!newMagicLink) {
      throw new Error('Failed to create magic link')
    }

    const res = await this.emailService.sendMagicLink({ email, token: newMagicLink.token })

    return res
  }
}
