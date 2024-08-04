import { getInjection } from '~~/server/di/container'
import type { MagicLink } from '~~/server/entities/models/magicLink'

export const getMagicLinkByTokenUsecase = async (
  token: string): Promise<MagicLink | undefined> => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const magicLink = await magicLinkRepository.getMagicLinkByToken(token)

  return magicLink
}
