import { z } from 'zod'
import { sendEmailMagicLinkUsecase } from '~~/server/application/usecases/email'
import { upsertMagicLinkUsecase } from '~~/server/application/usecases/magicLink'
import type { UpsertMagicLinkInput } from '~~/server/entities/models/magicLink'

export async function sendMagicLinkController(input: UpsertMagicLinkInput): Promise<{ message: string }> {
  const schema = z.object({
    email: z.string().email('Invalid email'),
  })

  const { data, error } = schema.safeParse(input)

  if (error) {
    throw new Error(error.name, { cause: error })
  }

  const magicLink = await upsertMagicLinkUsecase({ email: data.email })

  await sendEmailMagicLinkUsecase({ email: data.email, token: magicLink.token })

  return {
    message: 'Magic link sent',
  }
}
