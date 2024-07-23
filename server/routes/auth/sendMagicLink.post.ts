import { sendMagicLinkController } from '~~/server/interface-adapters/controllers/sendMagicLinkController'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await sendMagicLinkController(body.email)
})
