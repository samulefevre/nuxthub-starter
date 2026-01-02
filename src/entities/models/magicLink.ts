import { z } from 'zod'
import type { schema } from 'hub:db'

export type MagicLink = typeof schema.magicLinks.$inferSelect

export const upsertMagicLinkSchema = z.object({
  email: z.email('Invalid email'),
})

export type UpsertMagicLinkInput = z.infer<typeof upsertMagicLinkSchema>
