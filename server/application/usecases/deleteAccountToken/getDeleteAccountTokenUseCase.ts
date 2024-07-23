export const getDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  return await resolve('deleteAccountTokenRepository').getDeleteAccountToken({ userId, token })
}
