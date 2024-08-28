import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/di/types'
import type { IImageService } from '~~/src/application/services'
import { ImageService } from '~~/src/infrastructure/services'
import { ImageServiceMock } from '~~/src/infrastructure/services/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IImageService>(DI_SYMBOLS.IImageService).to(ImageServiceMock)
    return
  }

  bind<IImageService>(DI_SYMBOLS.IImageService).to(ImageService)
}

export const ImageModule = new ContainerModule(initializeModule)
