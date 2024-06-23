import { z } from 'zod'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  const schema = z.object({
    token: z.string(),
  })

  const { token } = await getValidatedQuery(event, schema.parse)

  const existingMagicLink = await selectMagicLink(token)

  if (existingMagicLink) {
    // check if magic link is expired
    if (new Date(existingMagicLink.expiresAt).getTime() < Date.now()) {
      await deleteMagicLink(token)

      return sendRedirect(event, '/auth/magicLinkExpired')
    }

    const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, existingMagicLink.email)).get()

    if (user) {
      await useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.token, token))

      await createUserSession(event, user)

      return sendRedirect(event, '/app')
    }

    const name = existingMagicLink.email.split('@')[0]

    const newUser = await useDrizzle().insert(tables.users).values({
      name,
      email: existingMagicLink.email,
    }).returning().get()

    await deleteMagicLink(token)
    await createUserSession(event, newUser)

    return sendRedirect(event, '/app')
  }

  return sendRedirect(event, '/auth/magicLinkExpired')
})

function selectMagicLink(token: string) {
  return useDrizzle().select().from(tables.magicLinks).where(eq(tables.magicLinks.token, token)).get()
}

function deleteMagicLink(token: string) {
  return useDrizzle().delete(tables.magicLinks).where(eq(tables.magicLinks.token, token))
}

function createUserSession(event: H3Event, user: User) {
  return setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar,
      role: user.role,
    },
    loggedInAt: Date.now(),
  })
}
