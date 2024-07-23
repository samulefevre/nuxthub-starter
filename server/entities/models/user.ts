import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  avatarUrl: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
