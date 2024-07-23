export async function sendEmailDeleteAccountUseCase({ email, token }: { email: string, token: string }): Promise<void> {
  await container.resolve('emailService').sendEmailDeleteAccount({ email, token })
}
