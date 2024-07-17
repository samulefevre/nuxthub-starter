export default defineEventHandler(async (event) => {
  const { sendDeleteAccountEmailUseCase } = event.context

  const { user } = await requireUserSession(event)

  await sendDeleteAccountEmailUseCase.execute({
    userId: user.id,

  })

  return {
    ok: true,
  }
})
