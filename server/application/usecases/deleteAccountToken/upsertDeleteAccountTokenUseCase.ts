import { getInjection } from '~~/server/di/container'

export const upsertDeleteAccountTokenUseCase = async (userId: number) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.upsertDeleteAccountToken({ userId })
}
