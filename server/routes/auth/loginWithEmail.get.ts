import { z } from 'zod'
import { loginWithMagicLinkUseCase } from '~~/server/domain/usecases/magicLink'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    token: z.string(),
  })

  const { token } = await getValidatedQuery(event, schema.parse)

  // return sendRedirect(event, '/')

  try {
    const user = await loginWithMagicLinkUseCase(token)

    console.log('USER', user)

    if (!user) {
      console.log('Magic exp')
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
    console.log('Error', error)
    return sendRedirect(event, '/auth/magicLinkExpired')
  }
})
