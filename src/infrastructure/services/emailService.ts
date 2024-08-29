import { render } from '@vue-email/render'
import { Resend } from 'resend'

import type { IEmailService } from '@@/src/application/services/IEmailService'
import { inject, injectable } from 'inversify'
import { startSpan, captureException } from '@sentry/nuxt'
import magicLink from '@/components/emails/magicLink.vue'
import deleteAccount from '@/components/emails/deleteAccount.vue'
import { DI_SYMBOLS } from '~~/di/types'

interface EmailOptions {
  from: string
  to: string
  subject: string
  html: string
}

@injectable()
export class EmailService implements IEmailService {
  private resend: Resend
  private baseUrl: string
  private fromEmail: string

  public constructor(
    @inject(DI_SYMBOLS.EmailApiKey) apiKey: string,
    @inject(DI_SYMBOLS.BaseUrl) baseUrl: string,
    @inject(DI_SYMBOLS.FromEmail) fromEmail: string,
  ) {
    if (!apiKey) {
      throw new Error('NUXT_RESEND_API_KEY is not defined')
    }

    if (!baseUrl) {
      throw new Error('NUXT_PUBLIC_BASE_URL is not defined')
    }

    if (!fromEmail) {
      throw new Error('NUXT_EMAILS_FROM_EMAIL is not defined')
    }

    this.resend = new Resend(apiKey)
    this.baseUrl = baseUrl
    this.fromEmail = fromEmail
  }

  async sendMagicLink({ email, token }: {
    email: string
    token: string
  }) {
    return await startSpan(
      {
        name: 'EmailService > sendMagicLink',
      },
      async () => {
        try {
          const template = await render(magicLink, {
            url: `${this.baseUrl}/auth/loginWithEmail?token=${token}`,
          })

          const options: EmailOptions = {
            from: this.fromEmail,
            to: email,
            subject: 'Login with email',
            html: template,
          }

          const { error } = await this.resend.emails.send(options)

          if (error) {
            captureException(error)
            throw new Error(error.message)
          }

          return { ok: true }
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }

  async sendEmailDeleteAccount({ email, token }: {
    email: string
    token: string
  }) {
    return await startSpan(
      {
        name: 'EmailService > sendEmailDeleteAccount',
      },
      async () => {
        try {
          const template = await render(deleteAccount, {
            url: `${this.baseUrl}/deleteAccount?token=${token}`,
          })

          const options: EmailOptions = {
            from: this.fromEmail,
            to: email,
            subject: 'Delete account',
            html: template,
          }

          const { error } = await this.resend.emails.send(options)

          if (error) {
            captureException(error)
            throw new Error(error.message)
          }

          return { ok: true }
        }
        catch (error) {
          captureException(error)
          throw error
        }
      },
    )
  }
}
