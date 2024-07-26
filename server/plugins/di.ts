import 'reflect-metadata'
import { initializeContainer } from '@@/server/di/container'

import { consola } from 'consola'

export default defineNitroPlugin(() => {
  onHubReady(async () => {
    consola.info('Hub is ready')
    consola.info('Import reflect-metadata')

    const config = useRuntimeConfig()

    initializeContainer(config)
  })
})
