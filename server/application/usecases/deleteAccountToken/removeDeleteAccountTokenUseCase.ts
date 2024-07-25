import { getInjection } from '~~/server/di/container'

export const removeDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })
}
