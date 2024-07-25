import { getInjection } from '~~/server/di/container'

export const deleteUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.deleteUser({ userId })
}
