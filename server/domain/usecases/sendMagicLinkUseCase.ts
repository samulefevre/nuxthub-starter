import type { IMagicLinkRepository } from '@@/server/domain/repositories'

import { useEmail } from '@@/server/utils/email'

interface ISendMagicLink {
  email: string
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}

export class SendMagicLinkUseCase {
  constructor(
    private readonly magicLinkRepository: IMagicLinkRepository,
  ) { }

  async execute({
    email,
    resendApiKey,
    baseUrl,
    fromEmail,
  }: ISendMagicLink) {
    const newMagicLink = await this.magicLinkRepository.upsertMagicLink(email)

    if (!newMagicLink) {
      throw new Error('Failed to create magic link')
    }

    // TODO: email service
    const res = await useEmail({ resendApiKey, baseUrl, fromEmail }).sendMagicLink(email, newMagicLink.token)

    return res
  }
}
