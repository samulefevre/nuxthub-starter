import { updateAvatarController } from '~~/server/interface-adapters/controllers/updateAvatarController'

export default defineEventHandler(async (event) => {
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

  try {
    const { updatedUser, blob } = await updateAvatarController({
      file,
      userId: user.id,
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
  }
  catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }

    throw createError(
      {
        statusCode: 500,
        statusMessage: 'Failed to update avatar',
      })
  }
})
