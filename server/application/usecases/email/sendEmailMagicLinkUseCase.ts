import { getInjection } from '~~/server/di/container'

export async function sendEmailMagicLinkUseCase({ email, token }: { email: string, token: string }): Promise<void> {
  const emailService = getInjection('IEmailService')
  await emailService.sendMagicLink({ email, token })
}
