import { Request, Response, NextFunction } from 'express'
// import dotenv from 'dotenv'

// Models
// import { User } from '../models/user.model'

// Utils
// import { catchAsync } from '../utils/catchAsync.util'
// import { AppError } from '../utils/appError.util'
// import jwt from 'jsonwebtoken'

// dotenv.config({ path: './config.env' })

// const protectSession = catchAsync(
//   async (req: Express.Request, _res: Express.Response, next: NextFunction) => {
//     // Get token
//     let token

//     // if (
//     //   req.headers.authorization &&
//     //   req.headers.authorization.startsWith('Bearer')
//     // ) {
//     //   // Extract token
//     //   // req.headers.authorization = 'Bearer token'
//     //   token = req.headers.authorization.split(' ')[1] // -> [Bearer, token]
//     // }

//     // Check if the token was sent or not
//     // if (!token) {
//     //   return next(new AppError('The token was invalid', 403))
//     // }

//     // Verify the token
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     // Verify the token's owner
//     const user = await User.findOne({
//       where: { id: decoded.id, status: 'active' }
//     })

//     if (user == null) {
//       return next(
//         new AppError('The owner of the session is no longer active', 403)
//       )
//     }

//     // Grant access
//     //  req.sessionUser = user; => por revisar
//     next()
//   }
// )

// Check the sessionUser to compare to the one that wants to be updated/deleted
const protectUsersAccount = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  //   const { sessionUser, user } = req; => por revisar
  // const { id } = req.params;

  // If the users (ids) don't match, send an error, otherwise continue
  //   if (sessionUser.id !== user.id) {
  //     return next(new AppError("You are not the owner of this account.", 403));
  //   } => por revisar

  // If the ids match, grant access
  next()
}

// Create middleware that only grants access to admin users
const protectAdmin = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  //   const { sessionUser } = req; => por revisar

  //   if (sessionUser.role !== "admin") {
  //     return next(new AppError("You do not have the right access level.", 403));
  //   }

  next()
}

export = {
  // protectSession,
  protectUsersAccount,
  protectAdmin
}
