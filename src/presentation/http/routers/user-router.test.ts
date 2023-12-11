import request from 'supertest'
import { User } from '@_domain/entities/user'
import server from '@_presentation/http/server'
import UsersRouter from './user-router'
import { IGetAllUsersUseCase } from '@_domain/interfaces/use-cases/user/get-all-users'
import { IGetUserUseCase } from '@_domain/interfaces/use-cases/user/get-user'

class MockGetAllUsersUseCase implements IGetAllUsersUseCase {
  execute(): Promise<User[]> {
    throw new Error('Method not implemented')
  }
}

class MockGetUserUseCase implements IGetUserUseCase {
  execute(): Promise<User> {
    throw new Error('Method not implemented')
  }
}

describe('User Router', () => {
  let mockGetAllUsers: IGetAllUsersUseCase
  let mockGetUser: IGetUserUseCase

  beforeAll(() => {
    mockGetAllUsers = new MockGetAllUsersUseCase()
    mockGetUser = new MockGetUserUseCase()

    server.use('/api/users', UsersRouter(mockGetAllUsers, mockGetUser))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /users', () => {
    test('should return 200 with data', async () => {
      const expectedData = [
        { id: 123, name: 'John', email: 'john@example.com' },
      ] as User[]
      jest
        .spyOn(mockGetAllUsers, 'execute')
        .mockImplementation(() => Promise.resolve(expectedData))

      const response = await request(server).get('/api/users')
      expect(response.status).toBe(200)
      expect(mockGetAllUsers.execute).toHaveBeenCalledTimes(1)
      expect(response.body).toStrictEqual(expectedData)
    })

    test('should return 500 on use case error', async () => {
      jest
        .spyOn(mockGetAllUsers, 'execute')
        .mockImplementation(() => Promise.reject(Error()))

      const response = await request(server).get('/api/users')
      expect(response.status).toBe(500)
      expect(mockGetAllUsers.execute).toHaveBeenCalledTimes(1)
      expect(response.body).toStrictEqual({
        message: 'Error fetching users data',
      })
    })
  })
})
