import { getContainer } from '@@/server/di/container'

export default defineNitroPlugin((nitroApp) => {
  onHubReady(async () => {
    console.log('Hub is ready')

    // getContainer() service core:user:worker: Uncaught TypeError: Cannot read properties of undefined (reading 'split')
  })
})
