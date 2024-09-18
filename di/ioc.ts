import { startSpan } from '@sentry/nuxt'
// @ts-expect-error awilix is not typed for browser
import { asClass, createContainer } from 'awilix/lib/awilix.browser.js'

import type { DI_RETURN_TYPES, DI_SYMBOLS } from './types'

import {
  UserRepository,
  MagicLinkRepository,
  DeleteAccountTokenRepository,
} from '~~/src/infrastructure/repositories'

import {
  EmailService,
  ImageService,
} from '~~/src/infrastructure/services'

interface Config {
  resendApiKey: string
  public: {
    baseUrl: string
  }
  emails: {
    fromEmail: string
  }
}

const container = createContainer()

export const initializeContainer = (config?: Config) => {
  // for env: test
  if (!config) {
    config = {
      resendApiKey: process.env.NUXT_RESEND_API_KEY ?? '',
      public: {
        baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? '',
      },
      emails: {
        fromEmail: process.env.NUXT_EMAILS_FROM_EMAIL ?? '',
      },
    }
  }

  container.register({
    // Repositories
    IUserRepository: asClass(UserRepository),
    IMagicLinkRepository: asClass(MagicLinkRepository),
    IDeleteAccountTokenRepository: asClass(DeleteAccountTokenRepository),

    // Services
    IEmailService: asClass(EmailService).inject(() => ({
      apiKey: config.resendApiKey,
      baseUrl: config.public.baseUrl,
      fromEmail: config.emails.fromEmail,
    })),
    IImageService: asClass(ImageService),
  })
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => container.resolve<DI_RETURN_TYPES[K]>(symbol.toString()),
  )
}

export { container }
