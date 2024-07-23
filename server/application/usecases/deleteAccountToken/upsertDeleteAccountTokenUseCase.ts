export const upsertDeleteAccountTokenUseCase = async (userId: number) => {
  return await resolve('deleteAccountTokenRepository').upsertDeleteAccountToken({ userId })
}
