import { Container } from 'inversify'

import type { NitroRuntimeConfig } from 'nitropack'
import type { DI_RETURN_TYPES } from './types'
import { DI_SYMBOLS } from './types'
import { UserModule, DeleteAccountTokenModule, MagicLinkModule, EmailModule, ImageModule } from './modules'

const appContainer = new Container({
  defaultScope: 'Singleton',
})

let config: NitroRuntimeConfig

export const getConfig = () => config

export const initializeContainer = (nitroConfig?: NitroRuntimeConfig) => {
  if (nitroConfig) {
    // have to use this for production for cloudflare workers to get environment variables
    config = nitroConfig
  }
  else {
    // have to use this for tests
    config = useRuntimeConfig()
  }

  appContainer.load(UserModule)
  appContainer.load(DeleteAccountTokenModule)
  appContainer.load(MagicLinkModule)
  appContainer.load(EmailModule)
  appContainer.load(ImageModule)
}

export const destroyContainer = () => {
  appContainer.unbindAll()
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return appContainer.get(DI_SYMBOLS[symbol])
}

export { appContainer }
