import { getInjection } from '~~/di/container'
import type { User } from '~~/src/entities/models/user'

export const createUserUsecase = async ({ email, name }: { email: string, name: string }): Promise<User> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.createUser({ email, name })
}
