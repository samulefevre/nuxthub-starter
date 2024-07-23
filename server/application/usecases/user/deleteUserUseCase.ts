export const deleteUserUseCase = async (userId: number): Promise<User | undefined> => {
  return await resolve('userRepository').deleteUser({ userId })
}
