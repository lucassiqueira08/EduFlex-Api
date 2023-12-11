import { prisma } from '../../../../global'
import { PrismaUserRepository } from './prisma-user-repository'

describe('MySQLDB Prisma DataSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getAllUsers', async () => {
    const ds = new PrismaUserRepository()
    jest.spyOn(prisma.user, 'findMany').mockImplementation(
      () =>
        Promise.resolve([
          { name: 'Smith', id: BigInt(123), email: 'john@gmail.com' },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ]) as any,
    )
    const result = await ds.getAllUsers()
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        email: true,
        name: true,
      },
    })
    expect(result).toStrictEqual([
      { name: 'Smith', id: 123, email: 'john@gmail.com' },
    ])
  })
})
