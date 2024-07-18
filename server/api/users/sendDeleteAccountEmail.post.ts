export default defineEventHandler(async (event) => {
  const { sendDeleteAccountEmailUseCase } = useDI(useDrizzle(), event)

  const { user } = await requireUserSession(event)

  await sendDeleteAccountEmailUseCase.execute({
    userId: user.id,

  })

  return {
    ok: true,
  }
})
