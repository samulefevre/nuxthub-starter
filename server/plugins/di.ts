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

export default defineNitroPlugin((nitroApp) => {
  onHubReady(async () => {
    const config = useRuntimeConfig()
    const { resendApiKey } = config
    const { baseUrl } = config.public
    const { fromEmail } = config.emails

    const db = useDrizzle()

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

    nitroApp.deleteAccountUseCase = deleteAccountUseCase
    nitroApp.updateAvatarUseCase = updateAvatarUseCase
    nitroApp.signInUseCase = signInUseCase
    nitroApp.sendDeleteAccountEmailUseCase = sendDeleteAccountEmailUseCase
    nitroApp.sendMagicLinkUseCase = sendMagicLinkUseCase
    nitroApp.loginWithMagicLinkUseCase = loginWithMagicLinkUseCase
  })
})
