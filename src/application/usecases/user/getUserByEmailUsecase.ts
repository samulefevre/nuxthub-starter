import { getInjection } from '@@/di/ioc'

export const getUserByEmailUsecase = async (email: string) => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUserByEmail(email)
}
