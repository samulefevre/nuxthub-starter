import { getInjection } from '~~/server/di/container'

export async function sendEmailMagicLinkUsecase({ email, token }: { email: string, token: string }): Promise<void> {
  const emailService = getInjection('IEmailService')
  await emailService.sendMagicLink({ email, token })
}
