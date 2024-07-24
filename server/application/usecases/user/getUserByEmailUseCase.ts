export const getUserByEmailUseCase = async (email: string) => {
  return await useContainer().resolve('userRepository').getUserByEmail(email)
}
