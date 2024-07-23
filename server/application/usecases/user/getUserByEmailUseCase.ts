export const getUserByEmailUseCase = async (email: string) => {
  return await resolve('userRepository').getUserByEmail(email)
}
