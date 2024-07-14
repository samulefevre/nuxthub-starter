export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp()
  const { sendDeleteAccountEmailUseCase } = nitroApp

  const { user } = await requireUserSession(event)

  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  await sendDeleteAccountEmailUseCase.execute({
    userId: user.id,
    resendApiKey,
    baseUrl,
    fromEmail,
  })

  return {
    ok: true,
  }
})
