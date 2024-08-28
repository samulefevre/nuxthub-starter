import { ContainerModule, type interfaces } from 'inversify'
import { getConfig } from '../container'
import { DI_SYMBOLS } from '~~/di/types'
import type { IEmailService } from '~~/src/application/services'
import { EmailService } from '~~/src/infrastructure/services'
import { EmailServiceMock } from '~~/src/infrastructure/services/mocks'

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === 'test') {
    bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailServiceMock)
  }
  else {
    bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailService)
  }

  const { resendApiKey, public: { baseUrl }, emails: { fromEmail } } = getConfig()

  bind<string>(DI_SYMBOLS.EmailApiKey).toConstantValue(resendApiKey)
  bind<string>(DI_SYMBOLS.BaseUrl).toConstantValue(baseUrl)
  bind<string>(DI_SYMBOLS.FromEmail).toConstantValue(fromEmail)
}

export const EmailModule = new ContainerModule(initializeModule)
