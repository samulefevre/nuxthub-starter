import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp()
  const { deleteAccountUseCase } = nitroApp

  const { user } = await requireUserSession(event)

  const schema = z.object({
    token: z.string(),
  })

  const { token } = await readValidatedBody(event, schema.parse)

  await deleteAccountUseCase.execute({
    userId: user.id,
    token,
  })

  return {
    ok: true,
    message: 'Your account has been deleted',
  }
})
