export async function sendEmailMagicLinkUseCase({ email, token }: { email: string, token: string }): Promise<void> {
  await useContainer().resolve('emailService').sendMagicLink({ email, token })
}
