import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IImageService } from '~~/server/application/services'
import { ImageService } from '~~/server/infrastructure/services'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IImageService>(DI_SYMBOLS.IImageService).to(ImageService)
}

export const ImageModule = new ContainerModule(initializeModule)
