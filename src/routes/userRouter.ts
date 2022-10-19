import express from 'express'

import { createBulkUser, createUser, deleteUser, getAllUsers, getUserById, login, updateCredentials } from '../controllers/users.controller'
import { protectSession } from '../middlewares/auth.middlewares'
import { userExists } from '../middlewares/exists.middlewares'
import { createOrUpdateUserValidators } from '../middlewares/userValidators.middlewares'

const userRouter = express.Router()

// rutas de acceso
userRouter
  .post('/login', login)
  .post('/singup', createOrUpdateUserValidators, createUser)
  .post('/bulk', createBulkUser)
  .use(protectSession)
  .get('/', getAllUsers)
  .get('/:userId', userExists, getUserById)
  .patch('/', createOrUpdateUserValidators, updateCredentials)
  .delete('/', userExists, deleteUser)

export default userRouter
