import { Toucan } from 'toucan-js'
import { H3Error } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  const { sentry } = useRuntimeConfig()

  if (!sentry.dsn) {
    console.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  nitroApp.hooks.hook('error', (err, context) => {
    // Do not handle 404, 422 and 401 errors
    if (err instanceof H3Error) {
      if (err.statusCode === 404 || err.statusCode === 422 || err.statusCode === 401) {
        return
      }
    }

    const sentryToucan = new Toucan({
      dsn: sentry.dsn,
      context: context.event,
    })

    sentryToucan.setTag('server', true)
    // set some other tags

    sentryToucan.captureException(err)
  })

  nitroApp.hooks.hook('request', (event) => {
    const sentryToucan = new Toucan({
      dsn: sentry.dsn,
      context: event,
    })

    event.context.$sentry = sentryToucan
  })
})
