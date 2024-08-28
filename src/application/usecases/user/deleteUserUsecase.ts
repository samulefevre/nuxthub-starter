import { getInjection } from '~~/di/container'
import type { User } from '~~/src/entities/models/user'

export const deleteUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.deleteUser({ userId })
}
