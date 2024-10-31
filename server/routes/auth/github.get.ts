import { signInController } from '~~/src/interface-adapters/controllers/auth/signInController'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    try {
      const user = await signInController({
        email: githubUser.email,
        name: githubUser.name,
        avatarUrl: githubUser.avatar_url,
      })

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
      console.error(error)
      throw createError({
        message: 'An error occurred while signing in',
        statusCode: 500,
      })
    }
  },
})
