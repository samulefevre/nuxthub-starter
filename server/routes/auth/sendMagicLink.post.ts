import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { sendMagicLinkUseCase } = useDI(useDrizzle(), event)

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
