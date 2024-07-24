export const getUserByEmailUseCase = async (email: string) => {
  return await useDI().resolve('userRepository').getUserByEmail(email)
}
