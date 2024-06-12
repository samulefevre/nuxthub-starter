import { Resend } from 'resend'
import type { H3Event } from 'h3'
import { useCompiler } from '#vue-email'

export function useEmail(event: H3Event) {
  const config = useRuntimeConfig(event)
  const { resendApiKey } = config
  const { baseUrl } = config.public

  const _sendEmail = async (options: { from: string, to: string, subject: string, html: string }) => {
    if (!resendApiKey) {
      throw new Error('NUXT_RESEND_API_KEY is not defined')
    }

    const resend = new Resend(resendApiKey)
    await resend.emails.send(options)
  }

  const sendMagicLink = async (email: string, token: string) => {
    const template = await useCompiler('magicLink.vue', {
      props: {
        url: `${baseUrl}/auth/loginWithEmail?token=${token}`,
      },
    })

    // send email
    const options = {
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Login with email',
      html: template.html,
    }

    await _sendEmail(options)
  }

  return {
    sendMagicLink,
  }
}
