import { updateAvatarUseCase } from '~~/server/domain/usecases/users'

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

  const { updatedUser, blob } = await updateAvatarUseCase(file, user.id)

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
