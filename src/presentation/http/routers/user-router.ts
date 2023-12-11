import express from 'express'
import { Request, Response } from 'express'
import { IGetUserUseCase } from '@_domain/interfaces/use-cases/user/get-user'
import { IGetAllUsersUseCase } from '@_domain/interfaces/use-cases/user/get-all-users'

export default function UsersRouter(
  getAllUsersUseCase: IGetAllUsersUseCase,
  getUserUseCase: IGetUserUseCase,
) {
  const router = express.Router()

  router.get('/', async (_req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute()
      res.send(users)
    } catch (error) {
      res.status(500).send({ message: 'Error fetching users data' })
    }
  })

  router.get('/:email', async (req: Request, res: Response) => {
    try {
      const user = await getUserUseCase.execute({ email: req.params.email })
      res.send(user)
    } catch (error) {
      res.status(500).send({ message: 'Error fetching users data' })
    }
  })

  return router
}
