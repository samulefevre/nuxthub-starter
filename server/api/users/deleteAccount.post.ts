import { z } from 'zod'
import { deleteAccountUseCase } from '~~/server/domain/usecases/deleteAccount'

export default defineEventHandler(async (event) => {
  console.log('Deleting account')
  const { user } = await requireUserSession(event)

  const schema = z.object({
    token: z.string(),
  })

  const { token } = await readValidatedBody(event, schema.parse)

  console.log('Deleting account for user')

  const res = await deleteAccountUseCase({
    userId: user.id,
    token,
  })

  if (!res) {
    console.log('Account not found')
    /* throw createError({
      statusCode: 400,
      statusMessage: 'Account not found',
    }) */
  }

  return {
    ok: true,
    message: 'Your account has been deleted',
  }
})
