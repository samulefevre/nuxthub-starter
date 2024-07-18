import {
  DrizzleDeleteAccountTokenRepository,
  DrizzleImageRepository,
  DrizzleMagicLinkRepository,
  DrizzleUserRepository,
} from '@@/server/data/repositories'

import {
  UpdateAvatarUseCase,
  LoginWithMagicLinkUseCase,
  SendMagicLinkUseCase,
  SignInUseCase,
  DeleteAccountUseCase,
  SendDeleteAccountEmailUseCase,
} from '@@/server/domain/usecases'
import { EmailService } from '@@/server/data/services'
import type { DrizzleD1Database } from 'drizzle-orm/d1'

import type * as schema from '@@/server/database/schema'
import type { H3Event } from 'h3'

interface Instance {
  deleteAccountTokenRepository: DrizzleDeleteAccountTokenRepository
  userRepository: DrizzleUserRepository
  imageRepository: DrizzleImageRepository
  magicLinkRepository: DrizzleMagicLinkRepository
  emailService: EmailService
  deleteAccountUseCase: DeleteAccountUseCase
  updateAvatarUseCase: UpdateAvatarUseCase
  signInUseCase: SignInUseCase
  sendDeleteAccountEmailUseCase: SendDeleteAccountEmailUseCase
  sendMagicLinkUseCase: SendMagicLinkUseCase
  loginWithMagicLinkUseCase: LoginWithMagicLinkUseCase
}

let instance: Instance | null = null

export const useDI = (db: DrizzleD1Database<typeof schema>, event: H3Event) => {
  if (!instance) {
    const config = useRuntimeConfig(event)
    const { resendApiKey } = config
    const { baseUrl } = config.public
    const { fromEmail } = config.emails

    const deleteAccountTokenRepository = new DrizzleDeleteAccountTokenRepository(db)
    const userRepository = new DrizzleUserRepository(db)
    const imageRepository = new DrizzleImageRepository()
    const magicLinkRepository = new DrizzleMagicLinkRepository(db)

    const emailService = new EmailService({
      apiKey: resendApiKey,
      baseUrl,
      fromEmail,
    })

    const deleteAccountUseCase = new DeleteAccountUseCase(
      userRepository,
      deleteAccountTokenRepository,
      imageRepository,
    )

    const updateAvatarUseCase = new UpdateAvatarUseCase(userRepository, imageRepository)
    const signInUseCase = new SignInUseCase(
      userRepository,
      imageRepository,
    )
    const sendDeleteAccountEmailUseCase = new SendDeleteAccountEmailUseCase({
      userRepository,
      deleteAccountTokenRepository,
      emailService,
    })
    const sendMagicLinkUseCase = new SendMagicLinkUseCase({
      magicLinkRepository,
      emailService,
    })
    const loginWithMagicLinkUseCase = new LoginWithMagicLinkUseCase(
      userRepository,
      magicLinkRepository,
    )

    instance = {
      deleteAccountTokenRepository,
      userRepository,
      imageRepository,
      magicLinkRepository,
      emailService,
      deleteAccountUseCase,
      updateAvatarUseCase,
      signInUseCase,
      sendDeleteAccountEmailUseCase,
      sendMagicLinkUseCase,
      loginWithMagicLinkUseCase,
    }
  }

  return instance
}
