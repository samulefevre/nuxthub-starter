import type { UserRepository } from '@/domain/repositories/UserRepository'

declare module '#app' {
  interface NuxtApp {
    $userRepository: UserRepository
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userRepository: UserRepository
  }
}
