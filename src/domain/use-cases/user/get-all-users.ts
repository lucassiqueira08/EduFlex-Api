import { User } from '@_domain/entities/user'
import { IUserRepository } from '@_domain/interfaces/repositories/user-repository'
import { IGetAllUsersUseCase } from '@_domain/interfaces/use-cases/user/get-all-users'

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers()
    return users.map(user => ({
      ...user,
      id: Number(user.id),
    }))
  }
}
