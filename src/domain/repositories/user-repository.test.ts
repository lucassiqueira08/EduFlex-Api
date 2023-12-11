import { IUserDataSource } from '@_data/interfaces/data-sources/user-data-source'
import { User } from '@_domain/entities/user'
import { UserRepository } from './user-repository'

class MockUserDataSource implements IUserDataSource {
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented')
  }
  getUser(): Promise<User> {
    throw new Error('Method not implemented')
  }
}

describe('User Repository', () => {
  let mockUserDataSource: MockUserDataSource
  let userRepository: UserRepository

  beforeEach(() => {
    jest.clearAllMocks()
    mockUserDataSource = new MockUserDataSource()
    userRepository = new UserRepository(mockUserDataSource)
  })

  describe('getAllUsers', () => {
    test('should return data', async () => {
      const expectedData = [
        { id: 123, name: 'John', email: 'john@example.com' },
      ]
      jest
        .spyOn(mockUserDataSource, 'getAll')
        .mockImplementation(() => Promise.resolve(expectedData))

      const result = await userRepository.getAllUsers()
      expect(result).toBe(expectedData)
    })
  })
})
