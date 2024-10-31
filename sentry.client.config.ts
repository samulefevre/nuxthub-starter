import * as Sentry from '@sentry/nuxt'
import dotenv from 'dotenv'

dotenv.config()

Sentry.init({
  dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
