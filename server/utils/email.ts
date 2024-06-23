import { Resend } from 'resend'
import type { H3Event } from 'h3'
import { render } from '@vue-email/render'
import magicLink from '~/components/emails/magicLink.vue'

export function useEmail(event: H3Event) {
  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public

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
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Login with email',
      html: template,
    }

    await _sendEmail(options)
  }

  return {
    sendMagicLink,
  }
}
