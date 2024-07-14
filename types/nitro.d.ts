import type {
  DeleteAccountUseCase,
  LoginWithMagicLinkUseCase,
  SendDeleteAccountEmailUseCase,
  SendMagicLinkUseCase,
  SignInUseCase,
  UpdateAvatarUseCase,
} from '@@/server/domain/usecases'

declare module 'nitropack' {
  interface NitroApp {
    deleteAccountUseCase: DeleteAccountUseCase
    loginWithMagicLinkUseCase: LoginWithMagicLinkUseCase
    sendDeleteAccountEmailUseCase: SendDeleteAccountEmailUseCase
    sendMagicLinkUseCase: SendMagicLinkUseCase
    signInUseCase: SignInUseCase
    updateAvatarUseCase: UpdateAvatarUseCase
  }
}
