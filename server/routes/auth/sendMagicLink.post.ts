import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp()
  const { sendMagicLinkUseCase } = nitroApp

  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { email } = await readValidatedBody(event, schema.parse)

  await sendMagicLinkUseCase.execute({
    email,
  })

  return {
    ok: true,
    message: 'Magic link sent',
  }
})
