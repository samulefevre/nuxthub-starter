export const deleteMagicLinkUseCase = async (
  token: string): Promise<MagicLink> => {
  const magicLink = await container.resolve('magicLinkRepository').deleteMagicLink(token)

  if (!magicLink) {
    throw new Error('Failed to delete magic link')
  }

  return magicLink
}
