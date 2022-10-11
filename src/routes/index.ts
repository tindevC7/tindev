import express from 'express'
import branchRouter from './branchRouter'
import technologyRouter from './technologyRouter'
import usersRouter from './userRouter'

const routers = express.Router()

// rutas de acceso
routers
  .use('/users', usersRouter)
  .use('/branchs', branchRouter)
  .use('/technologies', technologyRouter)

export default routers
