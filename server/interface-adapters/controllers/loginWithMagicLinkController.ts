import { deleteMagicLinkUseCase, getMagicLinkByTokenUseCase } from '~~/server/application/usecases/magicLink'
import { createMagicUserUseCase, getUserByEmailUseCase } from '~~/server/application/usecases/user'

export async function loginWithMagicLinkController(input: { token: string }): Promise<User> {
  const existingMagicLink = await getMagicLinkByTokenUseCase(input.token)

  if (!existingMagicLink) {
    throw new Error('Magic link not found')
  }

  if (existingMagicLink.tokenExpiresAt < new Date()) {
    await deleteMagicLinkUseCase(input.token)
    throw new Error('Magic link expired')
  }

  const user = await getUserByEmailUseCase(existingMagicLink.email)

  if (user) {
    await deleteMagicLinkUseCase(input.token)
    return user
  }
  else {
    const newUser = await createMagicUserUseCase({
      email: existingMagicLink.email,
    })

    await deleteMagicLinkUseCase(input.token)

    return newUser
  }
}
