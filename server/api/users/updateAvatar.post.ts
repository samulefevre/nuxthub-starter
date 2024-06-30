import { randomUUID } from 'uncrypto'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const form = await readFormData(event)
  const file = form.get('file') as File

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  ensureBlob(file, {
    maxSize: '1MB',
    types: ['image'],
  })

  const fileName = `avatar-${randomUUID()}`

  const currentUser = await userRepository().getUser(user.id)

  if (!currentUser) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  if (currentUser.avatar) {
    await hubBlob().delete(currentUser.avatar)
  }

  const blob = await hubBlob().put(fileName, file, {
    addRandomSuffix: false,
    prefix: `${user.id}`,
  })

  const updatedUser = await userRepository().updateAvatarPath({
    userId: user.id,
    avatarPath: blob.pathname,
  })

  await setUserSession(event, {
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatarUrl: updatedUser.avatar,
      role: updatedUser.role,
    },
  })

  return {
    ok: true,
    avatarPath: blob.pathname,
  }
})
