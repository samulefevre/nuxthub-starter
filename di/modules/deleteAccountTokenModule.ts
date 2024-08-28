import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/di/types'
import type { IDeleteAccountTokenRepository } from '~~/src/application/repositories'
import { DeleteAccountTokenRepository } from '~~/src/infrastructure/repositories'
import { DeleteAccountTokenRepositoryMock } from '~~/src/infrastructure/repositories/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IDeleteAccountTokenRepository>(DI_SYMBOLS.IDeleteAccountTokenRepository).to(DeleteAccountTokenRepositoryMock)
    return
  }
  bind<IDeleteAccountTokenRepository>(DI_SYMBOLS.IDeleteAccountTokenRepository).to(DeleteAccountTokenRepository)
}

export const DeleteAccountTokenModule = new ContainerModule(initializeModule)
