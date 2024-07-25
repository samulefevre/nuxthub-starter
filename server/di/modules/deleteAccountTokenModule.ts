import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IDeleteAccountTokenRepository } from '~~/server/application/repositories'
import { DrizzleDeleteAccountTokenRepository } from '~~/server/infrastructure/repositories'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IDeleteAccountTokenRepository>(DI_SYMBOLS.IDeleteAccountTokenRepository).to(DrizzleDeleteAccountTokenRepository)
}

export const DeleteAccountTokenModule = new ContainerModule(initializeModule)
