import { z } from 'zod'
import { UserMiddleWare } from '@_presentation/middlewares/user-middleware'
import { AnyProcedure } from '@trpc/server'

type TRPCRouter = {
  getAllUsers: AnyProcedure
  getUser: AnyProcedure
}

export default function TRPCUsersRouter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publicProcedure: any,
  userMiddleWare: UserMiddleWare,
) {
  const getAllUsers = publicProcedure.query(async () => {
    const users = await userMiddleWare.getAllUsers().execute()
    return users
  })

  const getUser = publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ email }: { email: string }) => {
      const users = await userMiddleWare.getUser().execute({ email })
      return users
    })

  const routes: TRPCRouter = { getAllUsers, getUser }
  return routes
}
