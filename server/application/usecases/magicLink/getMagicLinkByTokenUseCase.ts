export const getMagicLinkByTokenUseCase = async (
  token: string): Promise<MagicLink> => {
  const magicLink = await container.resolve('magicLinkRepository').getMagicLinkByToken(token)

  if (!magicLink) {
    throw new Error('Failed to create magic link')
  }

  return magicLink
}
