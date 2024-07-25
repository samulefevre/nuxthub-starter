import type { IUserRepository } from '../application/repositories'

export interface DI_RETURN_TYPES {
  IUserRepository: IUserRepository
}

export const DI_SYMBOLS = {
  IUserRepository: Symbol.for('IUserRepository'),
}
