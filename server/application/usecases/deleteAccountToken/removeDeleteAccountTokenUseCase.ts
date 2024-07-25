import { getInjection } from '~~/server/di/container'

export const removeDeleteAccountTokenUsecase = async ({ userId, token }: { userId: number, token: string }) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })
}
