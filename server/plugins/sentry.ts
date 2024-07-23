import { Toucan } from 'toucan-js'

export default defineNitroPlugin((nitroApp) => {
  const { sentry } = useRuntimeConfig()

  if (!sentry.dsn) {
    console.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  nitroApp.hooks.hook('error', (err, context) => {
    const sentryToucan = new Toucan({
      dsn: sentry.dsn,
      context: context.event,
    })

    sentryToucan.setTag('server', true)
    // set some other tags

    sentryToucan.captureException(err)
  })
})
