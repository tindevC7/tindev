import { Response, Request, NextFunction } from 'express'
import { UserAttributes } from '../models/user.model'
import { getAll, create, update } from '../services/userService'
import { catchAsync } from '../utils/catchAsync.util'

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
  const data = await create(user)

  res.status(201).json({
    status: 'success',
    data
  })
})

const updateById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userUpdate: UserAttributes = req.body
  const { user } = req
  const data = await update(user, userUpdate)
  res.status(200).json({
    status: 'success',
    data
  })
})

// const deleteUser = catchAsync(async (req, res, next) => {
//   const { user } = req

//   await user.update({ status: 'deleted' })

//   res.status(204).json({ status: 'success' })
// })

// const login = catchAsync(async (req, res, next) => {
//   // Get email and password from req.body
//   const { email, password } = req.body

//   // Validate if the user exist with given email
//   const user = await User.findOne({
//     where: { email, status: 'active' }
//   })

//   // Compare passwords (entered password vs db password)
//   // If user doesn't exists or passwords doesn't match, send error
//   if ((user == null) || !(await bcrypt.compare(password, user.password))) {
//     return next(new AppError('Wrong credentials', 400))
//   }

//   // Remove password from response
//   user.password = undefined

//   // Generate JWT (payload, secretOrPrivateKey, options)
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: '30d'
//   })

//   res.status(200).json({
//     status: 'success',
//     data: { user, token }
//   })
// })

export { createUser, getAllUsers, getUserById, updateById }
