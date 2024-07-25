import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IDeleteAccountTokenRepository } from '~~/server/application/repositories'
import { DrizzleDeleteAccountTokenRepository } from '~~/server/infrastructure/repositories'
import { DeleteAccountTokenRepositoryMock } from '~~/server/infrastructure/repositories/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IDeleteAccountTokenRepository>(DI_SYMBOLS.IDeleteAccountTokenRepository).to(DeleteAccountTokenRepositoryMock)
    return
  }
  bind<IDeleteAccountTokenRepository>(DI_SYMBOLS.IDeleteAccountTokenRepository).to(DrizzleDeleteAccountTokenRepository)
}

export const DeleteAccountTokenModule = new ContainerModule(initializeModule)
