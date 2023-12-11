import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import TRPCUsersRouter from './routers/user-router'
import { UserMiddleWare } from '../middlewares/user-middleware'

const t = initTRPC.create()
export const publicProcedure = t.procedure
export const createTRPCRouter = t.router

const userMiddleWare = new UserMiddleWare()
const userRoutes = TRPCUsersRouter(publicProcedure, userMiddleWare)

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  console.log('⬅️ [TRPC] ', req.method, req.path, req.body ?? req.query)
  return {
    req,
    res,
  }
}

const router = createTRPCRouter({
  getAllUsers: userRoutes.getAllUsers,
})
export const AppRouter = typeof router

const trpcRouter = trpcExpress.createExpressMiddleware({
  router,
  createContext,
})

console.log('🚀 TRPC Server running on http://localhost:4000/trpc')

export default trpcRouter
