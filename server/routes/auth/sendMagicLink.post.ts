import { z } from 'zod'
import { sendMagicLinkUseCase } from '~~/server/domain/usecases/magicLink'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { email } = await readValidatedBody(event, schema.parse)

  await sendMagicLinkUseCase({
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
