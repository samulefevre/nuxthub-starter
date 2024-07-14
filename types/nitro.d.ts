import type { UpdateAvatarUseCase } from '@@/server/domain/usecases/updateAvatarUseCase'

declare module 'nitropack' {
  interface NitroApp {
    updateAvatarUseCase: UpdateAvatarUseCase
  }
}
