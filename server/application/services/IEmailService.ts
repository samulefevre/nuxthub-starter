export interface IEmailService {
  sendMagicLink({ email, token }: {
    email: string
    token: string
  }): Promise<{ ok: boolean } | null>

  sendEmailDeleteAccount({ email, token }: {
    email: string
    token: string
  }): Promise<{ ok: boolean } | null>
}
