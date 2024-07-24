export const deleteUserUseCase = async (userId: number): Promise<User | undefined> => {
  return await useContainer().resolve('userRepository').deleteUser({ userId })
}
