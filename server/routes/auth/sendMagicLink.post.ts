import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp()
  const { sendMagicLinkUseCase } = nitroApp

  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { email } = await readValidatedBody(event, schema.parse)

  await sendMagicLinkUseCase.execute({
    email,
    resendApiKey,
    baseUrl,
    fromEmail,
  })

  return {
    ok: true,
    message: 'Magic link sent',
  }
})
