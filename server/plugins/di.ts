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

export default defineNitroPlugin((nitroApp) => {
  onHubReady(async () => {
    const db = useDrizzle()

    const deleteAccountTokenRepository = new DrizzleDeleteAccountTokenRepository(db)
    const userRepository = new DrizzleUserRepository(db)
    const imageRepository = new DrizzleImageRepository()
    const magicLinkRepository = new DrizzleMagicLinkRepository(db)

    const deleteAccountUseCase = new DeleteAccountUseCase(
      userRepository,
      deleteAccountTokenRepository,
    )

    const updateAvatarUseCase = new UpdateAvatarUseCase(userRepository)
    const signInUseCase = new SignInUseCase(
      userRepository,
      imageRepository,
    )
    const sendDeleteAccountEmailUseCase = new SendDeleteAccountEmailUseCase(
      userRepository,
      deleteAccountTokenRepository,
    )
    const sendMagicLinkUseCase = new SendMagicLinkUseCase(magicLinkRepository)
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
