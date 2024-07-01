import { DrizzleImageRepository, DrizzleUserRepository } from '@@/server/repositories/index'

const imageRepository = new DrizzleImageRepository()
const userRepository = new DrizzleUserRepository()

export {
  userRepository,
  imageRepository,
}
