import { sendDeleteAccountEmailUseCase } from '~~/server/domain/usecases/deleteAccount'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public
  const { fromEmail } = config.emails

  await sendDeleteAccountEmailUseCase({
    userRepository: userRepository,
    userId: user.id,
    resendApiKey,
    baseUrl,
    fromEmail,
  })

  return {
    ok: true,
  }
})
