import { User } from '@_domain/entities/user'
import { IUserRepository } from '@_domain/interfaces/repositories/user-repository'
import { IGetUserUseCase } from '@_domain/interfaces/use-cases/user/get-user'

export class GetUserUseCase implements IGetUserUseCase {
  userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute({ email }: { email: string }): Promise<User | null> {
    const users = await this.userRepository.getUser({ email })
    return users
  }
}
