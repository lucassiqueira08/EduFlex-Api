import express from 'express'
import UsersRouter from './routers/user-router'
import { UserMiddleWare } from '../middlewares/user-middleware'

const expressRouter = express()
expressRouter.use((req, _res, next) => {
  console.log('⬅️ [HTTP] ', req.method, req.path, req.body ?? req.query)
  next()
})
expressRouter.use(express.json())

const userMiddleWare = new UserMiddleWare()

expressRouter.use(
  '/users',
  UsersRouter(userMiddleWare.getAllUsers(), userMiddleWare.getUser()),
)

console.log('🚀 HTTP Server running on http://localhost:4000/api')
export default expressRouter
