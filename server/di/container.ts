import { Container } from 'inversify'

import { DrizzleUserRepository } from '@@/server/infrastructure/repositories'
import type { IUserRepository } from '../application/repositories/IUserRepository'

const appContainer = new Container({
  defaultScope: 'Singleton',
})

appContainer.bind<IUserRepository>(Symbol.for('IUserRepository')).to(DrizzleUserRepository)

export interface DI_RETURN_TYPES {
  IUserRepository: IUserRepository
}

export const DI_SYMBOLS = {
  IUserRepository: Symbol.for('IUserRepository'),
}

export interface DI_RETURN_TYPES {
  IUserRepository: IUserRepository
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return appContainer.get(DI_SYMBOLS[symbol])
}

export { appContainer }
