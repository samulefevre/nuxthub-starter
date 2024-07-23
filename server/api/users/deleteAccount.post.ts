import { z } from 'zod'
import { deleteAccountController } from '~~/server/interface-adapters/controllers/deleteAccountController'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const schema = z.object({
    token: z.string(),
  })

  const { token } = await readValidatedBody(event, schema.parse)

  await deleteAccountController({
    userId: user.id,
    token,
  })

  return {
    ok: true,
    message: 'Your account has been deleted',
  }
})
