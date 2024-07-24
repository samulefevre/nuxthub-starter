// not used in this project

import type { AwilixContainer } from 'awilix'
import { createContainer, asClass } from 'awilix'
import { DrizzleDeleteAccountTokenRepository, DrizzleMagicLinkRepository, DrizzleUserRepository } from '@@/server/infrastructure/repositories'

import type { IDeleteAccountTokenRepository, IMagicLinkRepository, IUserRepository } from '@@/server/application/repositories'

import { EmailService, ImageService } from '@@/server/infrastructure/services'
import type { IImageService, IEmailService } from '@@/server/application/services'

export interface IDependencies {
  userRepository: IUserRepository
  deleteAccountTokenRepository: IDeleteAccountTokenRepository
  magicLinkRepository: IMagicLinkRepository
  emailService: IEmailService
  imageService: IImageService
}

let container: AwilixContainer<IDependencies>

export const getContainer = () => {
  if (!container) {
    console.log('DI: Creating container')
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
