export const removeDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  return await resolve('deleteAccountTokenRepository').removeDeleteAccountToken({ userId, token })
}
