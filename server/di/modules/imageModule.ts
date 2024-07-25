import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IImageService } from '~~/server/application/services'
import { ImageService } from '~~/server/infrastructure/services'
import { ImageServiceMock } from '~~/server/infrastructure/services/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IImageService>(DI_SYMBOLS.IImageService).to(ImageServiceMock)
  }
  else {
    bind<IImageService>(DI_SYMBOLS.IImageService).to(ImageService)
  }
}

export const ImageModule = new ContainerModule(initializeModule)
