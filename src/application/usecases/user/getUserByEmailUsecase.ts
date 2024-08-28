import { getInjection } from '@@/di/container'

export const getUserByEmailUsecase = async (email: string) => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUserByEmail(email)
}
