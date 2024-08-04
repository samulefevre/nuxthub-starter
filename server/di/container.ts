import { Container } from 'inversify'

import type { DI_RETURN_TYPES } from './types'
import { DI_SYMBOLS } from './types'
import { UserModule, DeleteAccountTokenModule, MagicLinkModule, EmailModule, ImageModule } from './modules'

const appContainer = new Container({
  defaultScope: 'Singleton',
})

interface Config {
  resendApiKey: string
  public: {
    baseUrl: string
  }
  emails: {
    fromEmail: string
  }
}

let envConfig: Config

export const getConfig = () => envConfig

export const initializeContainer = (config?: Config) => {
  if (config) {
    // have to use this for production for cloudflare workers to get environment variables
    envConfig = config
  }
  else {
    // have to use this for tests
    config = {
      resendApiKey: process.env.NUXT_RESEND_API_KEY ?? '',
      public: {
        baseUrl: process.env.NUXT_PUBLIC_BASE_URL ?? '',
      },
      emails: {
        fromEmail: process.env.NUXT_EMAILS_FROM_EMAIL ?? '',
      },
    }
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
