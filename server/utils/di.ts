import 'reflect-metadata'
import { Container } from 'inversify'

import type { IUserRepository } from '@@/server/application/repositories'

import { DrizzleUserRepository } from '@@/server/infrastructure/repositories'

export interface IDependencies {
  userRepository: DrizzleUserRepository
}

let container: Container

const initContainer = () => {
  if (!container) {
    console.log('Creating DI')
    container = new Container({
      // autoBindInjectable: true,
      defaultScope: 'Singleton',
    })

    /* container.register({
      userRepository: asClass(DrizzleUserRepository),
    }) */

    container.bind<IUserRepository>(Symbol.for('DrizzleUserRepository')).to(DrizzleUserRepository)
  }

  return container
}

export const getInjection = <T>(symbol: symbol) => {
  initContainer()
  return container.get<T>(symbol)
}
