export interface IEmailService {
  sendMagicLink({ email, token }: {
    email: string
    token: string
  }): Promise<{ ok: boolean } | null>

  sendDeleteAccountEmail({ email, token }: {
    email: string
    token: string
  }): Promise<{ ok: boolean } | null>
}
