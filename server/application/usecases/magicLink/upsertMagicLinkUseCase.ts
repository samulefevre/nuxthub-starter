import { getInjection } from '~~/server/di/container'

interface ISendMagicLink {
  email: string
}

export const upsertMagicLinkUseCase = async ({
  email,
}: ISendMagicLink) => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const newMagicLink = await magicLinkRepository.upsertMagicLink(email)

  if (!newMagicLink) {
    throw new Error('Failed to create magic link')
  }

  return newMagicLink
}
