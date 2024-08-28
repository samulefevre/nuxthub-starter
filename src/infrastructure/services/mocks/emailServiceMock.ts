import { injectable } from 'inversify'
import type { IEmailService } from '~~/src/application/services'

@injectable()
export class EmailServiceMock implements IEmailService {
  sendMagicLink(): Promise<{ ok: boolean } | null> {
    return Promise.resolve({ ok: true })
  }

  sendEmailDeleteAccount(): Promise<{ ok: boolean } | null> {
    return Promise.resolve({ ok: true })
  }
}
