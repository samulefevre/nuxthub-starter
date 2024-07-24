export const upsertDeleteAccountTokenUseCase = async (userId: number) => {
  return await useContainer().resolve('deleteAccountTokenRepository').upsertDeleteAccountToken({ userId })
}
