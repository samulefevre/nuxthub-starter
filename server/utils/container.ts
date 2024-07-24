import type { AwilixContainer } from 'awilix'
import { createContainer, asClass } from 'awilix'
import type { IImageService, IEmailService } from '@@/server/application/services'

import type { IDeleteAccountTokenRepository, IMagicLinkRepository, IUserRepository } from '@@/server/application/repositories'

import { EmailService, ImageService } from '@@/server/infrastructure/services'
import { DrizzleDeleteAccountTokenRepository, DrizzleMagicLinkRepository, DrizzleUserRepository } from '@@/server/infrastructure/repositories'

export interface IDependencies {
  userRepository: IUserRepository
  deleteAccountTokenRepository: IDeleteAccountTokenRepository
  magicLinkRepository: IMagicLinkRepository
  emailService: IEmailService
  imageService: IImageService
}

let container: AwilixContainer<IDependencies>

export const useContainer = () => {
  if (!container) {
    console.log('Creating container')
    container = createContainer<IDependencies>({
      strict: true,
      injectionMode: 'PROXY',
    })

    const { resendApiKey } = useRuntimeConfig()
    const { fromEmail } = useRuntimeConfig().emails
    const { baseUrl } = useRuntimeConfig().public

    container.register({
      userRepository: asClass(DrizzleUserRepository),
      deleteAccountTokenRepository: asClass(DrizzleDeleteAccountTokenRepository),
      magicLinkRepository: asClass(DrizzleMagicLinkRepository),
      emailService: asClass(EmailService).inject(() => ({
        apiKey: resendApiKey,
        baseUrl,
        fromEmail,
      })),
      imageService: asClass(ImageService),
    })
  }

  return container
}

/* let container: AwilixContainer<IDependencies>

function initContainer(): AwilixContainer<IDependencies> {
  const newContainer = createContainer<IDependencies>({
    strict: true,
    injectionMode: 'CLASSIC',
  })

  const { resendApiKey } = useRuntimeConfig()
  const { fromEmail } = useRuntimeConfig().emails
  const { baseUrl } = useRuntimeConfig().public

  newContainer.register({
    userRepository: asClass(DrizzleUserRepository).singleton(),
    deleteAccountTokenRepository: asClass(DrizzleDeleteAccountTokenRepository).singleton(),
    magicLinkRepository: asClass(DrizzleMagicLinkRepository).singleton(),
    emailService: asClass(EmailService).inject(() => ({
      apiKey: resendApiKey,
      baseUrl,
      fromEmail,
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
 */
