import { User } from '@_domain/entities/user'
export type IGetUserUseCase = {
  execute({ email }: { email: string }): Promise<User | null>
}
