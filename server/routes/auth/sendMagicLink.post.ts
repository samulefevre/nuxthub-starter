import { z } from 'zod'
import { randomUUID } from 'uncrypto'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { email } = await readValidatedBody(event, schema.parse)

  const existingMagicLink = await useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.email, email)).get()

  if (existingMagicLink) {
    // await sendMagicLink(email)
    await useEmail(event).sendMagicLink(email, existingMagicLink.token)

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

  // await sendMagicLink(email)
  await useEmail(event).sendMagicLink(email, insertedMagicLink.token)

  return {
    ok: true,
    body: {
      email,
    },
  }
})

/* async function sendMagicLink(email: string) {
  // Send email
  console.log(`Sending magic link to ${email}`)

  // await useEmail(event).sendMagicLink(email)
} */
