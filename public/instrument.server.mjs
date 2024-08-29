import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://ed55a0a67026ea971faa1b2c1c3e272e@o4506983804698624.ingest.us.sentry.io/4507651974889472",
  enabled: true,
  debug: true,
  tracesSampleRate: 1,
  environment: 'development',
});
