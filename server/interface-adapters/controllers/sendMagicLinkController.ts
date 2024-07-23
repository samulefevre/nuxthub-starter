import { z } from 'zod'
import { sendEmailMagicLinkUseCase } from '~~/server/application/usecases/email'
import { upsertMagicLinkUseCase } from '~~/server/application/usecases/magicLink'
import type { UpsertMagicLinkInput } from '~~/server/entities/models/magicLink'

export async function sendMagicLinkController(input: UpsertMagicLinkInput): Promise<{ message: string }> {
  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { data, error } = schema.safeParse(input)

  if (error) {
    throw new Error(error.name, { cause: error })
  }

  const magicLink = await upsertMagicLinkUseCase({ email: data.email })

  await sendEmailMagicLinkUseCase({ email: data.email, token: magicLink.token })

  return {
    message: 'Magic link sent',
  }
}
