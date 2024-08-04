import { z } from 'zod'

export default eventHandler(async (event) => {
  const schema = z.object({
    pathname: z.string(),
  })

  const { pathname } = await getValidatedRouterParams(event, schema.parse)

  return hubBlob().serve(event, pathname)
})
