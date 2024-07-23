export async function sendEmailMagicLinkUseCase({ email, token }: { email: string, token: string }): Promise<void> {
  await container.resolve('emailService').sendMagicLink({ email, token })
}
