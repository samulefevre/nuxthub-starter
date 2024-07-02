import { z } from 'zod'
import { deleteAccountUseCase } from '~~/server/domain/usecases/deleteAccount'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const schema = z.object({
    token: z.string(),
  })

  const { token } = await readValidatedBody(event, schema.parse)
  await deleteAccountUseCase({
    userId: user.id,
    token,
  })

  return {
    ok: true,
    message: 'Your account has been deleted',
  }
})
