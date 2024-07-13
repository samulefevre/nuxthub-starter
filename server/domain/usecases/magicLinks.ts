import type { IMagicLinkRepository } from '../repositories'

export const sendMagicLinkUseCase = async ({
  magicLinkRepository,
  email,
  resendApiKey,
  baseUrl,
  fromEmail,
}: {
  magicLinkRepository: IMagicLinkRepository
  email: string
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}) => {
  const token = await magicLinkRepository.upsertMagicLink(email)

  await useEmail({ resendApiKey, baseUrl, fromEmail }).sendMagicLink(email, token)
}

interface ILoginWithMagicLink {
  magicLinkRepository: IMagicLinkRepository
  token: string
}

export const loginWithMagicLinkUseCase = async ({
  magicLinkRepository,
  token,
}: ILoginWithMagicLink): Promise<User | undefined> => {
  const existingMagicLink = await magicLinkRepository.getMagicLinkByToken(token)

  if (!existingMagicLink) {
    throw new Error('Magic link not found')
  }

  if (existingMagicLink.tokenExpiresAt < new Date()) {
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
