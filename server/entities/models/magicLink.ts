import { z } from 'zod'

export const upsertMagicLinkSchema = z.object({
  email: z.string().email('Invalid email'),
})

export type UpsertMagicLinkInput = z.infer<typeof upsertMagicLinkSchema>
