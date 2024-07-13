import { DrizzleImageRepository, DrizzleUserRepository } from '~~/server/data/repositories'
import { signInUseCase } from '~~/server/domain/usecases/users'

export default oauth.googleEventHandler({
  config: {
    authorizationParams: {
      access_type: 'offline',
    },
  },
  async onSuccess(event, { user: googleUser }) {
    const user = await signInUseCase({
      userRepository: new DrizzleUserRepository(useDrizzle()),
      imageRepository: new DrizzleImageRepository(),
      email: googleUser.email,
      name: googleUser.name,
      avatarUrl: googleUser.picture,
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
