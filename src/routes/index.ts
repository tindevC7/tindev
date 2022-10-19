import express from 'express'

import reviewRouter from './reviewRouter'
import profileRouter from './profileRouter'
import roleRouter from './roleRouter'
import technologyRouter from './technologyRouter'
import userRouter from './userRouter'

const routers = express.Router()

// rutas de acceso
routers
  .use('/profiles', profileRouter)
  .use('/reviews', reviewRouter)
  .use('/roles', roleRouter)
  .use('/technologies', technologyRouter)
  .use('/users', userRouter)

export default routers
