import { getInjection } from '~~/server/di/container'

export const getMagicLinkByTokenUseCase = async (
  token: string): Promise<MagicLink> => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const magicLink = await magicLinkRepository.getMagicLinkByToken(token)

  if (!magicLink) {
    throw new Error('Failed to create magic link')
  }

  return magicLink
}
