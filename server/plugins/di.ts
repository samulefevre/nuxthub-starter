import 'reflect-metadata'
import { initializeContainer } from '@@/server/di/container'

import { consola } from 'consola'

export default defineNitroPlugin((nitro) => {
  onHubReady(async () => {
    consola.info('Hub is ready')
    consola.info('Import reflect-metadata')

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
})
