import { PrismaUserRepository } from '../../data/data-sources/prisma/repositories/prisma-user-repository'
import { Inject } from '../../decorators/inject'
import { IGetAllUsersUseCase } from '@_domain/interfaces/use-cases/user/get-all-users'
import { GetAllUsersUseCase } from '../../domain/use-cases/user/get-all-users'
import { GetUserUseCase } from '../../domain/use-cases/user/get-user'
import { IGetUserUseCase } from '@_domain/interfaces/use-cases/user/get-user'

export class UserMiddleWare {
  @Inject(PrismaUserRepository, GetAllUsersUseCase)
  getAllUsers(currentMethod = undefined): IGetAllUsersUseCase {
    return currentMethod as unknown as IGetAllUsersUseCase
  }

  @Inject(PrismaUserRepository, GetUserUseCase)
  getUser(currentMethod = undefined): IGetUserUseCase {
    return currentMethod as unknown as IGetUserUseCase
  }
}
