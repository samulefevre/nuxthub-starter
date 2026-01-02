import { initializeContainer } from '@@/di/ioc'

import { consola } from 'consola'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hookOnce('beforeResponse', async (event) => {
    consola.info('Initializing container')
    const config = useRuntimeConfig(event)
    initializeContainer({
      resendApiKey: config.resendApiKey,
      public: {
        baseUrl: config.public.baseUrl,
      },
      emails: {
        fromEmail: config.emails.fromEmail,
      },
    })
  })
})
