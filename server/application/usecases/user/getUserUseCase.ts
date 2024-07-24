export const getUserUseCase = async (userId: number): Promise<User | undefined> => {
  return await useContainer().resolve('userRepository').getUser(userId)
}
