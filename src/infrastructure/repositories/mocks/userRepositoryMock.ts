import { injectable } from 'inversify'
import type { IUserRepository } from '~~/src/application/repositories'
import { DatabaseOperationError } from '~~/src/entities/errors/common'
import type { User } from '~~/src/entities/models/user'

@injectable()
export class UserRepositoryMock implements IUserRepository {
  private users: User[] = []

  createUser({ email, name }: { email: string, name: string }): Promise<User> {
    const user: User = {
      id: this.users.length + 1,
      email,
      name,
      role: 'user',
      avatar: null,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(user)
    return Promise.resolve(user)
  }

  createMagicUser({ email }: { email: string }): Promise<User> {
    let name = email.split('@')[0] ?? ''

    // replace all non-alphanumeric characters with space
    name = name.replace(/[^a-zA-Z0-9]/g, ' ')

    //  uppercasing the first letter of each word
    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return this.createUser({ email, name })
  }

  getUser(userId: number): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.id === userId))
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.email === email))
  }

  updateUser({ userId, updatedUser }: { userId: number, updatedUser: Partial<User> }): Promise<User> {
    const user = this.users.find(user => user.id === userId)

    if (!user) {
      throw new DatabaseOperationError('User not found')
    }

    Object.assign(user, updatedUser)

    return Promise.resolve(user)
  }

  deleteUser({ userId }: { userId: number }): Promise<User | undefined> {
    const index = this.users.findIndex(user => user.id === userId)

    return index >= 0 ? Promise.resolve(this.users.splice(index, 1)[0]) : Promise.resolve(undefined)
  }
}
