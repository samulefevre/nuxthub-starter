export const sendMagicLinkUseCase = async ({ email,
  resendApiKey,
  baseUrl,
  fromEmail,
}: {
  email: string
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}) => {
  const token = await magicLinkRepository.upsertMagicLink(email)

  await useEmail({ resendApiKey, baseUrl, fromEmail }).sendMagicLink(email, token)
}

export const loginWithMagicLinkUseCase = async (token: string): Promise<User | undefined> => {
  const existingMagicLink = await magicLinkRepository.getMagicLink(token)

  if (!existingMagicLink) {
    throw new Error('Magic link not found')
  }

  if (new Date(existingMagicLink.tokenExpiresAt).getTime() < Date.now()) {
    await magicLinkRepository.deleteMagicLink(token)
    throw new Error('Magic link expired')
  }

  const user = await userRepository.getUserByEmail(existingMagicLink.email)

  if (user) {
    await magicLinkRepository.deleteMagicLink(token)
    return user
  }
  else {
    const newUser = await userRepository.createMagicUser({
      email: existingMagicLink.email,
    })

    await magicLinkRepository.deleteMagicLink(token)

    return newUser
  }
}
