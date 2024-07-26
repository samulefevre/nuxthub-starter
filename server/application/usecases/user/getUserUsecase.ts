import { getInjection } from '~~/server/di/container'

export const getUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUser(userId)
}
