import type { AwilixContainer } from 'awilix'
import { createContainer, asClass } from 'awilix'

/* import type { IUserRepository } from '@@/server/application/repositories' */

import { DrizzleUserRepository } from '@@/server/infrastructure/repositories'

export interface IDependencies {
  userRepository: DrizzleUserRepository
}

let container: AwilixContainer<IDependencies>

export const useDI = () => {
  if (!container) {
    console.log('Creating DI')
    container = createContainer<IDependencies>({
      // strict: true,
      injectionMode: 'PROXY',
    })

    container.register({
      userRepository: asClass(DrizzleUserRepository),
    })
  }

  return container
}
