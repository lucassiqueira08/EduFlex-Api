import { User } from '@_domain/entities/user'

export type IUserRepository = {
  getAllUsers(): Promise<User[]>
  getUser({ email }: { email: string }): Promise<User | null>
}
