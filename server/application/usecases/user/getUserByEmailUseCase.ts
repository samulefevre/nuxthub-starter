import type { IUserRepository } from '../../repositories'

export const getUserByEmailUseCase = async (email: string) => {
  const userRepository = getInjection<IUserRepository>(Symbol.for('DrizzleUserRepository'))
  return await userRepository.getUserByEmail(email)
}
