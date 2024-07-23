import type { AwilixContainer } from 'awilix'
import { createContainer, asClass } from 'awilix'
import { DrizzleDeleteAccountTokenRepository, DrizzleMagicLinkRepository, DrizzleUserRepository } from '../infrastructure/repositories'

import type { IDeleteAccountTokenRepository, IMagicLinkRepository, IUserRepository } from '../application/repositories'

import { EmailService, ImageService } from '../infrastructure/services'
import type { IImageService, IEmailService } from '../application/services'

export interface IDependencies {
  userRepository: IUserRepository
  deleteAccountTokenRepository: IDeleteAccountTokenRepository
  magicLinkRepository: IMagicLinkRepository
  emailService: IEmailService
  imageService: IImageService
}

let container: AwilixContainer<IDependencies> | null = null

export function getContainer(): AwilixContainer<IDependencies> {
  if (!container) {
    if (!process.env.NUXT_RESEND_API_KEY) {
      throw new Error('NUXT_RESEND_API_KEY is not defined')
    }

    container = createContainer<IDependencies>({
      strict: true,
    })

    container.register({
      userRepository: asClass(DrizzleUserRepository).singleton(),
      deleteAccountTokenRepository: asClass(DrizzleDeleteAccountTokenRepository).singleton(),
      magicLinkRepository: asClass(DrizzleMagicLinkRepository).singleton(),
      emailService: asClass(EmailService).inject(() => ({
        apiKey: process.env.NUXT_RESEND_API_KEY || '',
        baseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
        fromEmail: process.env.NUXT_EMAILS_FROM_EMAIL || '',
      })).singleton(),
      imageService: asClass(ImageService).singleton(),
    })
  }
  return container
}

export function resolve<K extends keyof IDependencies>(key: K): IDependencies[K] {
  const container = getContainer()
  return container.resolve(key)
}
