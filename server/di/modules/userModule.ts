import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IUserRepository } from '~~/server/application/repositories'
import { UserRepository } from '~~/server/infrastructure/repositories'
import { UserRepositoryMock } from '~~/server/infrastructure/repositories/mocks/userRepositoryMock'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepositoryMock)
    return
  }
  bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository)
}

export const UserModule = new ContainerModule(initializeModule)
