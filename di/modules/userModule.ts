import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/di/types'
import type { IUserRepository } from '~~/src/application/repositories'
import { UserRepository } from '~~/src/infrastructure/repositories'
import { UserRepositoryMock } from '~~/src/infrastructure/repositories/mocks/userRepositoryMock'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepositoryMock)
    return
  }
  bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository)
}

export const UserModule = new ContainerModule(initializeModule)
