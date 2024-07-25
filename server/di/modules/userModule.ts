import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '../types'
import type { IUserRepository } from '~~/server/application/repositories'
import { DrizzleUserRepository } from '~~/server/infrastructure/repositories'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(DrizzleUserRepository)
}

export const UserModule = new ContainerModule(initializeModule)
