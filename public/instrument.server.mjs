import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
  enabled: true,
  debug: true,
  tracesSampleRate: 1,
  environment: process.env.NODE_ENV,
});
