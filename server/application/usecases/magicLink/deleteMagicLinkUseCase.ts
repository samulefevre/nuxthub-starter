export const deleteMagicLinkUseCase = async (
  token: string): Promise<MagicLink> => {
  const magicLink = await useContainer().resolve('magicLinkRepository').deleteMagicLink(token)

  if (!magicLink) {
    throw new Error('Failed to delete magic link')
  }

  return magicLink
}
