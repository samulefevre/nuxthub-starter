import { sendMagicLinkController } from '~~/server/interface-adapters/controllers/magicLink/sendMagicLinkController'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await sendMagicLinkController(body.email)
})
