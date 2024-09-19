import { getInjection } from '~~/di/ioc'
import type { MagicLink } from '~~/src/entities/models/magicLink'

export const deleteMagicLinkUsecase = async (
  token: string): Promise<MagicLink> => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const magicLink = await magicLinkRepository.deleteMagicLink(token)

  return magicLink
}
