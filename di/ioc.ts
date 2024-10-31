import { startSpan } from '@sentry/nuxt'

import { asClass, createContainer } from 'awilix/browser'

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
import { DeleteAccountTokenRepositoryMock, MagicLinkRepositoryMock, UserRepositoryMock } from '~~/src/infrastructure/repositories/mocks'
import { EmailServiceMock, ImageServiceMock } from '~~/src/infrastructure/services/mocks'

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

export const initializeContainer = (config: Config) => {
  container.register({
    // Repositories
    IUserRepository: asClass(UserRepository).singleton(),
    IMagicLinkRepository: asClass(MagicLinkRepository).singleton(),
    IDeleteAccountTokenRepository: asClass(DeleteAccountTokenRepository).singleton(),

    // Services
    IEmailService: asClass(EmailService).inject(() => ({
      apiKey: config.resendApiKey,
      baseUrl: config.public.baseUrl,
      fromEmail: config.emails.fromEmail,
    })).singleton(),
    IImageService: asClass(ImageService).singleton(),
  })
}

export const initializeContainerForTests = () => {
  const config = {
    resendApiKey: process.env.NUXT_RESEND_API_KEY ?? '',
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? '',
    },
    emails: {
      fromEmail: process.env.NUXT_EMAILS_FROM_EMAIL ?? '',
    },
  }

  container.register({
    // Repositories
    IUserRepository: asClass(UserRepositoryMock).singleton(),
    IMagicLinkRepository: asClass(MagicLinkRepositoryMock).singleton(),
    IDeleteAccountTokenRepository: asClass(DeleteAccountTokenRepositoryMock).singleton(),

    // Services
    IEmailService: asClass(EmailServiceMock).inject(() => ({
      apiKey: config.resendApiKey,
      baseUrl: config.public.baseUrl,
      fromEmail: config.emails.fromEmail,
    })).singleton(),
    IImageService: asClass(ImageServiceMock).singleton(),
  })
}

export const destroyContainer = () => {
  container.dispose()
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
