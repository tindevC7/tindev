import { Response, Request, NextFunction } from 'express'
import { UserAttributes } from '../models/user.model'
import { getAll, create, update, getByEmail, remove, createBulk } from '../services/userService'
import { catchAsync } from '../utils/catchAsync.util'
import { AppError } from '../utils/appError.util'
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'

const getAllUsers = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const data = await getAll()

  res.status(200).json({
    status: 'success',
    data
  })
}
)

const getUserById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { user } = req
  res.status(200).json({
    status: 'success',
    data: user
  })
})

const createUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const user: UserAttributes = req.body
  const data = await create(user) as UserAttributes
  // Remove password from respondse
  data.password = undefined

  res.status(201).json({
    status: 'success',
    data
  })
})

const createBulkUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const users: UserAttributes[] = req.body
  const data = await createBulk(users)
  // Remove password from respondse

  res.status(201).json({
    status: 'success',
    data
  })
})

const updateCredentials = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userUpdate: UserAttributes = req.body
  const { sessionUser } = req
  const data = await update(sessionUser, userUpdate) as UserAttributes

  data.password = undefined

  res.status(200).json({
    status: 'success',
    data
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { sessionUser } = req

  await remove(sessionUser)

  res.status(204).json({ status: 'success' })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Get email and password from req.body
  const { email, password } = req.body

  // Validate if the user exist with given email
  const user = await getByEmail(email) as unknown as UserAttributes

  // Compare passwords (entered password vs db password)
  // If user doesn't exists or passwords doesn't match, send error
  if ((user == null) || !(await bcrypt.compare(password, user.password as string))) {
    return next(new AppError('Wrong credentials', 400))
  }

  // Remove password from response
  user.password = undefined

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '30d'
  })

  res.status(200).json({
    status: 'success',
    data: { user, token }
  })
})

export { createUser, createBulkUser, getAllUsers, getUserById, updateCredentials, login, deleteUser }
