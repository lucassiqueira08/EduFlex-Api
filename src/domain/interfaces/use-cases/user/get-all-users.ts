import { User } from '@_domain/entities/user'

export type IGetAllUsersUseCase = {
  execute(): Promise<User[]>
}
