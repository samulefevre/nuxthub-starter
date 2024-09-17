import { startSpan } from '@sentry/nuxt'
import { asClass, createContainer } from 'awilix'
import type { DI_RETURN_TYPES, DI_SYMBOLS } from './types'
import { UserRepository } from '~~/src/infrastructure/repositories'

const container = createContainer()

container.register({
  // Registering a class
  IUserRepository: asClass(UserRepository),
  // Registering a function
  // userService: asFunction(UserService),
  // Registering a value
  // dbConnection: asValue(dbConnection),
})

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => container.resolve<DI_RETURN_TYPES[K]>(symbol.toString()),
  )
}

export { container }
