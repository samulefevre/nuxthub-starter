import { sendDeleteAccountEmailController } from '~~/src/interface-adapters/controllers/email/sendDeleteAccountEmailController'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  await sendDeleteAccountEmailController(user.id)

  return {
    ok: true,
  }
})
