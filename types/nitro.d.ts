import type {
  DeleteAccountUseCase,
  LoginWithMagicLinkUseCase,
  SendDeleteAccountEmailUseCase,
  SendMagicLinkUseCase,
  SignInUseCase,
  UpdateAvatarUseCase,
} from '@@/server/domain/usecases'

declare module 'h3' {
  interface H3EventContext {
    deleteAccountUseCase: DeleteAccountUseCase
    loginWithMagicLinkUseCase: LoginWithMagicLinkUseCase
    sendDeleteAccountEmailUseCase: SendDeleteAccountEmailUseCase
    sendMagicLinkUseCase: SendMagicLinkUseCase
    signInUseCase: SignInUseCase
    updateAvatarUseCase: UpdateAvatarUseCase
  }
}
