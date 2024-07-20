import type { IUserRepository, IImageRepository } from '@@/server/domain/repositories'

interface ISignin {
  email: string
  name: string
  avatarUrl?: string
}

export class SignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private imageRepository: IImageRepository,
  ) { }

  async execute({
    email,
    name,
    avatarUrl,
  }: ISignin) {
    let existingUser = await this.userRepository.getUserByEmail(email)

    if (!existingUser) {
      existingUser = await this.userRepository.createUser({ email, name })

      if (!avatarUrl) {
        return existingUser
      }

      const file = await this.imageRepository.getFileFromUrl(avatarUrl)

      if (file) {
        const blob = await this.imageRepository.saveAvatar({
          file,
          userId: existingUser.id,
        })

        const avatar = blob.pathname

        existingUser = await this.userRepository.updateUser({
          userId: existingUser.id,
          updatedUser: {
            avatar,
          },
        })

        if (!existingUser) {
          throw new Error('User not found')
        }
      }
    }

    return existingUser
  }
}
