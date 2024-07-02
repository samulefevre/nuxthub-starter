import { z } from 'zod'
import { randomUUID } from 'uncrypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { email } = await readValidatedBody(event, schema.parse)

  const existingMagicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.email, email)).get()

  if (existingMagicLink) {
    await useEmail({
      resendApiKey,
      baseUrl,
      fromEmail,
    }).sendMagicLink(email, existingMagicLink.token)

    return {
      ok: true,
      body: {
        email,
      },
    }
  }

  const insertedMagicLink = await useDrizzle().insert(tables.magicLinks).values({
    email,
    token: randomUUID(),
  }).returning().get()

  await useEmail({ resendApiKey, baseUrl, fromEmail }).sendMagicLink(email, insertedMagicLink.token)

  return {
    ok: true,
    body: {
      email,
    },
  }
})
