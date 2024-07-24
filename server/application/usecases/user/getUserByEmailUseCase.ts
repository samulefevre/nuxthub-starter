export const getUserByEmailUseCase = async (email: string) => {
  const userRepository = useDI().resolve('userRepository')
  return await userRepository.getUserByEmail(email)
}
