import { UserMiddleWare } from './user-middleware'

describe('User MiddleWare', () => {
  test('getAllUsers', () => {
    const middleware = new UserMiddleWare()
    expect(typeof middleware.getAllUsers()).toBe('object')
  })

  test('getUser', () => {
    const middleware = new UserMiddleWare()
    expect(typeof middleware.getUser()).toBe('object')
  })
})
