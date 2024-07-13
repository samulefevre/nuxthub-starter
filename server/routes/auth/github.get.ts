import { signInUseCase } from '@@/server/domain/usecases/users'

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    const user = await signInUseCase({
      userRepository: userRepository,
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
  },
})
