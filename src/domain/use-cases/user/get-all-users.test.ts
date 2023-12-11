import { User } from '@_domain/entities/user'
import { IUserRepository } from '@_domain/interfaces/repositories/user-repository'
import { GetAllUsersUseCase } from './get-all-users'

describe('Get All Users Use Case', () => {
  class MockUserRepository implements IUserRepository {
    getAllUsers(): Promise<User[]> {
      throw new Error('Method not implemented')
    }
    getUser(): Promise<User> {
      throw new Error('Method not implemented')
    }
  }

  let mockUserRepository: MockUserRepository
  beforeEach(() => {
    jest.clearAllMocks()
    mockUserRepository = new MockUserRepository()
  })

  test('should return data', async () => {
    const expectedData = [{ id: 123, name: 'John', email: 'john@example.com' }]
    jest
      .spyOn(mockUserRepository, 'getAllUsers')
      .mockImplementation(() => Promise.resolve(expectedData))
    const getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository)
    const result = await getAllUsersUseCase.execute()
    expect(result).toStrictEqual(expectedData)
  })
})
