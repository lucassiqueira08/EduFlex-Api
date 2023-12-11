import express from 'express'

import httpServer from './presentation/http/server'
import TRPCServer from './presentation/trpc/server'

const server = express()

server.use('/api', httpServer)
server.use('/trpc', TRPCServer)
server.listen(4000)
