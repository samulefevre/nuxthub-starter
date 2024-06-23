export default oauth.googleEventHandler({
  config: {
    authorizationParams: {
      access_type: 'offline',
    },
  },
  async onSuccess(event, { user: googleUser }) {
    const credential = await useDrizzle().select().from(tables.credentials).where(and(eq(tables.credentials.providerKey, googleUser.sub.toString()))).get()

    if (!credential) {
      const newUser = await useDrizzle().insert(tables.users).values({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
      }).onConflictDoUpdate({
        target: tables.users.email,
        set: {
          lastLogin: new Date(),
        },
      }).returning().get()

      if (!newUser) {
        throw createError({
          statusCode: 500,
          message: 'Failed to create user',
        })
      }

      const newCredential = await useDrizzle().insert(tables.credentials).values({
        providerId: 'google',
        providerKey: googleUser.sub.toString(),
        userId: newUser.id,
      }).returning().get()

      if (!newCredential) {
        throw createError({
          statusCode: 500,
          message: 'Failed to create credential',
        })
      }

      await setUserSession(event, {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatarUrl: newUser.avatar,
          role: newUser.role,
        },
        loggedInAt: Date.now(),
      })

      return sendRedirect(event, '/app')
    }

    const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.id, credential.userId)).get()

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    let name = user.name
    if (!name) {
      name = googleUser.name
    }

    await useDrizzle().update(tables.users).set({
      lastLogin: new Date(),
      name,
    }).where(eq(tables.users.id, user.id))

    await setUserSession(event, {
      user: {
        id: user.id,
        name,
        email: user.email,
        avatarUrl: user.avatar,
        role: user.role,
      },
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/app')
  },
})
