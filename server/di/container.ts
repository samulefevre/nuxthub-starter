import { Container } from 'inversify'

import type { DI_RETURN_TYPES } from './types'
import { DI_SYMBOLS } from './types'
import { UserModule } from './modules/userModule'

const appContainer = new Container({
  defaultScope: 'Singleton',
})

const initializeContainer = () => {
  appContainer.load(UserModule)
}

initializeContainer()

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return appContainer.get(DI_SYMBOLS[symbol])
}

export { appContainer }
