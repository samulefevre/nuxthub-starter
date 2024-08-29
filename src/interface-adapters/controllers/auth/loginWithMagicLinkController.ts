import { startSpan } from '@sentry/nuxt'
import { deleteMagicLinkUsecase, getMagicLinkByTokenUsecase } from '~~/src/application/usecases/magicLink'
import { createMagicUserUsecase, getUserByEmailUsecase } from '~~/src/application/usecases/user'
import type { User } from '~~/src/entities/models/user'

export async function loginWithMagicLinkController(input: { token: string }): Promise<User | undefined> {
  return await startSpan(
    {
      name: 'loginWithMagicLink Controller',
    },
    async () => {
      const existingMagicLink = await getMagicLinkByTokenUsecase(input.token)

      if (!existingMagicLink) {
        throw new Error('Magic link not found')
      }

      if (existingMagicLink.tokenExpiresAt < new Date()) {
        await deleteMagicLinkUsecase(input.token)
        throw new Error('Magic link expired')
      }

      const user = await getUserByEmailUsecase(existingMagicLink.email)

      if (user) {
        await deleteMagicLinkUsecase(input.token)
        return user
      }
      else {
        const newUser = await createMagicUserUsecase({
          email: existingMagicLink.email,
        })

        await deleteMagicLinkUsecase(input.token)

        return newUser
      }
    },
  )
}
