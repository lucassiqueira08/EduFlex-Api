import { User } from '@_domain/entities/user'

export type IUserDataSource = {
  getAll(): Promise<User[]>
  getUser({ email }: { email: string }): Promise<User>
}
