export const getUserUseCase = async (userId: number): Promise<User | undefined> => {
  return await resolve('userRepository').getUser(userId)
}
