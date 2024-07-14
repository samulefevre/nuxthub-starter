export default oauth.googleEventHandler({
  config: {
    authorizationParams: {
      access_type: 'offline',
    },
  },
  async onSuccess(event, { user: googleUser }) {
    const nitroApp = useNitroApp()
    const { signInUseCase } = nitroApp

    const user = await signInUseCase.execute({
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
