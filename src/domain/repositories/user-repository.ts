import { User } from '@_domain/entities/user'
import { IUserDataSource } from '@_data/interfaces/data-sources/user-data-source'
import { IUserRepository } from '@_domain/interfaces/repositories/user-repository'

export class UserRepository implements IUserRepository {
  userDataSource: IUserDataSource
  constructor(userDataSource: IUserDataSource) {
    this.userDataSource = userDataSource
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.userDataSource.getAll()
    return result
  }

  async getUser({ email }: { email: string }): Promise<User> {
    const result = await this.userDataSource.getUser({ email })
    return result
  }
}
