export const getDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  return await useContainer().resolve('deleteAccountTokenRepository').getDeleteAccountToken({ userId, token })
}
