import { getInjection } from '~~/di/container'
import type { User } from '~~/src/entities/models/user'

export const createMagicUserUsecase = async ({ email }: { email: string }): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.createMagicUser({ email })
}
