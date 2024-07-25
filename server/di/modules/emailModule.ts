import { ContainerModule, type interfaces } from 'inversify'
import { DI_SYMBOLS } from '~~/server/di/types'
import type { IEmailService } from '~~/server/application/services'
import { EmailService } from '~~/server/infrastructure/services'

const initializeModule = (bind: interfaces.Bind) => {
  bind<IEmailService>(DI_SYMBOLS.IEmailService).to(EmailService)
  bind<string>(DI_SYMBOLS.EmailApiKey).toConstantValue(process.env.NUXT_RESEND_API_KEY || '')
  bind<string>(DI_SYMBOLS.BaseUrl).toConstantValue(process.env.NUXT_PUBLIC_BASE_URL || '')
  bind<string>(DI_SYMBOLS.FromEmail).toConstantValue(process.env.NUXT_EMAILS_FROM_EMAIL || '')
}

export const EmailModule = new ContainerModule(initializeModule)
