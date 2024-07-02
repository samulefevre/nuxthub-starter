import { Resend } from 'resend'
import { render } from '@vue-email/render'
import magicLink from '~/components/emails/magicLink.vue'
import deleteAccount from '~/components/emails/deleteAccount.vue'

export function useEmail({
  resendApiKey,
  baseUrl,
  fromEmail,
}: {
  resendApiKey: string
  baseUrl: string
  fromEmail: string
},
) {
  interface EmailOptions {
    from: string
    to: string
    subject: string
    html: string
  }

  const _sendEmail = async (options: EmailOptions) => {
    if (!resendApiKey) {
      throw new Error('NUXT_RESEND_API_KEY is not defined')
    }

    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send(options)

    if (error) {
      throw createError({
        status: 500,
        message: error.message,
      })
    }
  }

  const sendMagicLink = async (email: string, token: string) => {
    const template = await render(magicLink, {
      url: `${baseUrl}/auth/loginWithEmail?token=${token}`,
    })

    const options: EmailOptions = {
      from: fromEmail,
      to: email,
      subject: 'Login with email',
      html: template,
    }

    await _sendEmail(options)
  }

  const sendDeleteAccountEmail = async ({ email, token }: {
    email: string
    token: string
  }) => {
    const template = await render(deleteAccount, {
      url: `${baseUrl}/deleteAccount?token=${token}`,
    })

    const options: EmailOptions = {
      from: fromEmail,
      to: email,
      subject: 'Delete account',
      html: template,
    }

    await _sendEmail(options)
  }

  return {
    sendMagicLink,
    sendDeleteAccountEmail,
  }
}
