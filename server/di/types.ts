import type { IMagicLinkRepository, IDeleteAccountTokenRepository, IUserRepository } from '~~/server/application/repositories'
import type { IImageService, IEmailService } from '~~/server/application/services'

export interface DI_RETURN_TYPES {
  IUserRepository: IUserRepository
  IDeleteAccountTokenRepository: IDeleteAccountTokenRepository
  IMagicLinkRepository: IMagicLinkRepository
  IImageService: IImageService
  IEmailService: IEmailService
  EmailApiKey: string
  BaseUrl: string
  FromEmail: string
}

export const DI_SYMBOLS = {
  IUserRepository: Symbol.for('IUserRepository'),
  IDeleteAccountTokenRepository: Symbol.for('IDeleteAccountTokenRepository'),
  IMagicLinkRepository: Symbol.for('IMagicLinkRepository'),
  IImageService: Symbol.for('IImageService'),
  IEmailService: Symbol.for('IEmailService'),
  EmailApiKey: Symbol.for('EmailApiKey'),
  BaseUrl: Symbol.for('BaseUrl'),
  FromEmail: Symbol.for('FromEmail'),
}
