import { getInjection } from '~~/server/di/container'

export const getDeleteAccountTokenUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.getDeleteAccountToken({ userId, token })
}
