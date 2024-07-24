export const removeDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  return await useContainer().resolve('deleteAccountTokenRepository').removeDeleteAccountToken({ userId, token })
}
