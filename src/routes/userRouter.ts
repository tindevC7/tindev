import express from 'express'
import { createUser, getAllUsers, getUserById, updateById } from '../controllers/users.controller'
import { userExists } from '../middlewares/exists.middlewares'
import { createUserValidators, updateUserValidators } from '../middlewares/validators.middlewares'

const usersRouter = express.Router()

// rutas de acceso
usersRouter
  .get('/', getAllUsers)
  .get('/:userId', userExists, getUserById)
  .post('/', createUserValidators, createUser)
  .patch('/:userId', updateUserValidators, userExists, updateById)

export default usersRouter
