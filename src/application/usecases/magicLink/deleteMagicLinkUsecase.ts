import { getInjection } from '~~/di/container'
import type { MagicLink } from '~~/src/entities/models/magicLink'

export const deleteMagicLinkUsecase = async (
  token: string): Promise<MagicLink> => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const magicLink = await magicLinkRepository.deleteMagicLink(token)

  if (!magicLink) {
    throw new Error('Failed to delete magic link')
  }

  return magicLink
}
