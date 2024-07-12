import type { UserApi } from '../api/UserApi'
import type { IUserRepository } from '~/domain/repositories/IUserRepository'

export class UserRepository implements IUserRepository {
  constructor(private userApi: UserApi) {
  }

  async updateAvatar(avatar: File): Promise<void> {
    return this.userApi.updateAvatar(avatar)
  }

  async sendDeleteAccountEmail(): Promise<void> {
    return this.userApi.sendDeleteAccountEmail()
  }

  async deleteAccount({ token }: { token: string }): Promise<void> {
    return this.userApi.deleteAccount({ token })
  }
}
