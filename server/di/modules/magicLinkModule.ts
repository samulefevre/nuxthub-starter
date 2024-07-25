import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IMagicLinkRepository } from '~~/server/application/repositories'
import { DrizzleMagicLinkRepository } from '~~/server/infrastructure/repositories'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IMagicLinkRepository>(DI_SYMBOLS.IMagicLinkRepository).to(DrizzleMagicLinkRepository)
}

export const MagicLinkModule = new ContainerModule(initializeModule)
