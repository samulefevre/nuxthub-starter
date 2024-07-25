import { Container } from 'inversify'

import type { DI_RETURN_TYPES } from './types'
import { DI_SYMBOLS } from './types'
import { UserModule, DeleteAccountTokenModule, MagicLinkModule, EmailModule, ImageModule } from './modules'

const appContainer = new Container({
  defaultScope: 'Singleton',
})

const initializeContainer = () => {
  appContainer.load(UserModule)
  appContainer.load(DeleteAccountTokenModule)
  appContainer.load(MagicLinkModule)
  appContainer.load(EmailModule)
  appContainer.load(ImageModule)
}

initializeContainer()

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return appContainer.get(DI_SYMBOLS[symbol])
}

export { appContainer }
