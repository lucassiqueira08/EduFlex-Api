import { User } from '@_domain/entities/user'
import { IUserRepository } from '@_domain/interfaces/repositories/user-repository'
import { prisma } from '../../../../global'

type PrismaUser = {
  id: bigint
} & User

export class PrismaUserRepository implements IUserRepository {
  public async getAllUsers(): Promise<User[]> {
    const users = (await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    })) as PrismaUser[]
    return users.map((user: PrismaUser) => ({
      ...user,
      id: Number(user.id),
    }))
  }

  public async getUser({ email }: { email: string }): Promise<User | null> {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: {
        email: {
          equals: email,
        },
      },
    })
    if (user) {
      const userId = Number(user.id)
      return {
        id: userId,
        name: user.name,
        email: user.email,
      }
    }
    return null
  }
}
