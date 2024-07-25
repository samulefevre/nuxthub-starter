// import { appContainer } from '@@/server/di/container'

export default defineNitroPlugin((nitroApp) => {
  onHubReady(async () => {
    console.log('Hub is ready')
  })
})
