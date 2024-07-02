export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    const credential = await useDrizzle().select().from(tables.credentials).where(and(eq(tables.credentials.providerKey, githubUser.id.toString()))).get()

    if (!credential) {
      const newUser = await useDrizzle().insert(tables.users).values({
        name: githubUser.name || githubUser.login,
        email: githubUser.email,
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

      let avatar = null
      const file = await imageRepository.getFileFromUrl(githubUser.avatar_url)

      if (file) {
        const blob = await imageRepository.saveAvatar({
          file,
          userId: newUser.id,
        })

        avatar = blob.pathname

        await userRepository.updateAvatarPath({
          userId: newUser.id,
          avatarPath: avatar,
        })
      }

      const newCredential = await useDrizzle().insert(tables.credentials).values({
        providerId: 'github',
        providerKey: githubUser.id.toString(),
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
          avatarUrl: avatar,
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
      name = githubUser.name
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
