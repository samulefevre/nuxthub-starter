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

let container: AwilixContainer<IDependencies>

function initContainer(): AwilixContainer<IDependencies> {
  const newContainer = createContainer<IDependencies>({
    strict: true,
  })

  const resendApiKey = process.env.NUXT_RESEND_API_KEY
  const baseUrl = process.env.NUXT_PUBLIC_BASE_URL
  const fromEmail = process.env.NUXT_EMAILS_FROM_EMAIL

  if (!resendApiKey) {
    console.error('NUXT_RESEND_API_KEY is not defined')
  }

  newContainer.register({
    userRepository: asClass(DrizzleUserRepository).singleton(),
    deleteAccountTokenRepository: asClass(DrizzleDeleteAccountTokenRepository).singleton(),
    magicLinkRepository: asClass(DrizzleMagicLinkRepository).singleton(),
    emailService: asClass(EmailService).inject(() => ({
      apiKey: resendApiKey || '',
      baseUrl: baseUrl || '',
      fromEmail: fromEmail || '',
    })).singleton(),
    imageService: asClass(ImageService).singleton(),
  })

  return newContainer
}

// Initialize the container immediately
try {
  container = initContainer()
}
catch (error) {
  console.error('Error initializing container:', error)
  throw error
}

export function getContainer(): AwilixContainer<IDependencies> {
  return container
}

export function resolve<K extends keyof IDependencies>(key: K): IDependencies[K] {
  try {
    return container.resolve(key)
  }
  catch (error) {
    console.error(`Error resolving ${key}:`, error)
    throw error
  }
}
