import { z } from 'zod'
import type { schema } from '~~/server/utils/drizzle'

export type User = typeof schema.users.$inferSelect

export const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  avatarUrl: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
