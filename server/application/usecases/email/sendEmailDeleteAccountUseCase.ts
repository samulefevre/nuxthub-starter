import { getInjection } from '~~/server/di/container'

export async function sendEmailDeleteAccountUsecase({ email, token }: { email: string, token: string }): Promise<{ ok: true }> {
  const emailService = getInjection('IEmailService')

  const res = await emailService.sendEmailDeleteAccount({ email, token })

  if (!res) {
    throw new Error('Email not sent')
  }

  return {
    ok: true,
  }
}
