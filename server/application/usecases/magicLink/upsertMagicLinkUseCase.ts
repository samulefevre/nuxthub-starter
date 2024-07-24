interface ISendMagicLink {
  email: string
}

export const upsertMagicLinkUseCase = async ({
  email,
}: ISendMagicLink) => {
  const newMagicLink = await useContainer().resolve('magicLinkRepository').upsertMagicLink(email)

  if (!newMagicLink) {
    throw new Error('Failed to create magic link')
  }

  return newMagicLink
}
