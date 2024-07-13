import { z } from 'zod'
import { loginWithMagicLinkUseCase } from '~~/server/domain/usecases/magicLinks'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    token: z.string(),
  })

  const { token } = await getValidatedQuery(event, schema.parse)

  try {
    const user = await loginWithMagicLinkUseCase({
      magicLinkRepository: magicLinkRepository,
      token,
    })

    if (!user) {
      return sendRedirect(event, '/auth/magicLinkExpired')
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar,
        role: user.role,
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/app')
  }
  catch (error) {
    return sendRedirect(event, '/auth/magicLinkExpired')
  }
})
