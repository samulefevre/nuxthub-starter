import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://ed55a0a67026ea971faa1b2c1c3e272e@o4506983804698624.ingest.us.sentry.io/4507651974889472',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending of user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
