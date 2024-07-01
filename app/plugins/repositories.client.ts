import type { UserRepository } from '@/domain/repositories/UserRepository'
import { ApiUserRepository } from '~/domain/repositories/ApiUserRepository'

export default defineNuxtPlugin((nuxtApp) => {
  const userRepository: UserRepository = new ApiUserRepository()
  nuxtApp.provide('userRepository', userRepository)
})
