import { render } from '@vue-email/render'
import { Resend } from 'resend'

import type { IEmailService } from '@@/server/application/services/IEmailService'
import magicLink from '@/components/emails/magicLink.vue'
import deleteAccount from '@/components/emails/deleteAccount.vue'

interface EmailOptions {
  from: string
  to: string
  subject: string
  html: string
}

export class EmailService implements IEmailService {
  private resend: Resend
  private baseUrl: string
  private fromEmail: string

  constructor({
    apiKey,
    baseUrl,
    fromEmail,
  }: {
    apiKey: string
    baseUrl: string
    fromEmail: string
  }) {
    if (!apiKey) {
      throw new Error('NUXT_RESEND_API_KEY is not defined')
    }
    this.resend = new Resend(apiKey)
    this.baseUrl = baseUrl
    this.fromEmail = fromEmail
  }

  async sendMagicLink({ email, token }: {
    email: string
    token: string
  }) {
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
      throw new Error(error.message)
    }

    return { ok: true }
  }

  async sendEmailDeleteAccount({ email, token }: {
    email: string
    token: string
  }) {
    const template = await render(deleteAccount, {
      url: `${this.baseUrl}/deleteAccount?token=${token}`,
    })

    const options: EmailOptions = {
      from: this.fromEmail,
      to: email,
      subject: 'Delete account',
      html: template,
    }

    await this.resend.emails.send(options)

    return { ok: true }
  }
}
