export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp()
  const { sendDeleteAccountEmailUseCase } = nitroApp

  const { user } = await requireUserSession(event)

  await sendDeleteAccountEmailUseCase.execute({
    userId: user.id,

  })

  return {
    ok: true,
  }
})
