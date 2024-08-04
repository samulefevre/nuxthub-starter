import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IMagicLinkRepository } from '~~/server/application/repositories'
import { MagicLinkRepository } from '~~/server/infrastructure/repositories'
import { MagicLinkRepositoryMock } from '~~/server/infrastructure/repositories/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IMagicLinkRepository>(DI_SYMBOLS.IMagicLinkRepository).to(MagicLinkRepositoryMock)
    return
  }
  bind<IMagicLinkRepository>(DI_SYMBOLS.IMagicLinkRepository).to(MagicLinkRepository)
}

export const MagicLinkModule = new ContainerModule(initializeModule)
