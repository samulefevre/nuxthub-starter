import { sendDeleteAccountEmailUseCase } from '~~/server/domain/usecases/deleteAccount'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  await sendDeleteAccountEmailUseCase({
    userId: user.id,
    resendApiKey,
    baseUrl,
    fromEmail,
  })

  return {
    ok: true,
  }
})
