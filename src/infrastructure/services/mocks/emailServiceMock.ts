import type { IEmailService } from '~~/src/application/services'

export class EmailServiceMock implements IEmailService {
  sendMagicLink(): Promise<{ ok: boolean } | null> {
    return Promise.resolve({ ok: true })
  }

  sendEmailDeleteAccount(): Promise<{ ok: boolean } | null> {
    return Promise.resolve({ ok: true })
  }
}
