import { ApiUserRepository } from '~/domain/repositories/ApiUserRepository'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Registering repositories plugin')
  nuxtApp.provide('userRepository', new ApiUserRepository())
})
