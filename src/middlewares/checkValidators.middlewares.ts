import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
// Utils
import { AppError } from '../utils/appError.util'

const checkValidations = (
  req: Request,
  _res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg)
    const message = errorMessages.join('. ')
    return next(new AppError(message, 400))
  }

  next()
}

export default checkValidations
