import { getInjection } from '~~/server/di/container'

export const getMagicLinkByTokenUsecase = async (
  token: string): Promise<MagicLink | undefined> => {
  const magicLinkRepository = getInjection('IMagicLinkRepository')
  const magicLink = await magicLinkRepository.getMagicLinkByToken(token)

  return magicLink
}
