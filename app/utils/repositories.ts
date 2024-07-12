import { UserRepository } from '~/infrastructure/repositories/UserRepository'
import { UserApi } from '~/infrastructure/api/UserApi'

const userRepository = new UserRepository(new UserApi())

export {
  userRepository,
}
