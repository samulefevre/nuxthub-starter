export async function sendEmailDeleteAccountUseCase({ email, token }: { email: string, token: string }): Promise<void> {
  await useContainer().resolve('emailService').sendEmailDeleteAccount({ email, token })
}
