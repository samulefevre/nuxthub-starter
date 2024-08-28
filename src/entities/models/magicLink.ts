import { z } from 'zod'
import type { schema } from '~~/server/utils/drizzle'

export type MagicLink = typeof schema.magicLinks.$inferSelect

export const upsertMagicLinkSchema = z.object({
  email: z.string().email('Invalid email'),
})

export type UpsertMagicLinkInput = z.infer<typeof upsertMagicLinkSchema>
