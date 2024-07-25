import { getInjection } from '~~/server/di/container'

export async function sendEmailDeleteAccountUsecase({ email, token }: { email: string, token: string }): Promise<void> {
  const emailService = getInjection('IEmailService')
  await emailService.sendEmailDeleteAccount({ email, token })
}
