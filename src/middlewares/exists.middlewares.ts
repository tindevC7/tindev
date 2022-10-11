import { Request, Response, NextFunction } from 'express'
// Models
import { User, Branch, Technology } from '../models'
// Utils
import { catchAsync } from '../utils/catchAsync.util'
import { AppError } from '../utils/appError.util'

const userExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params

    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: userId }
    })

    if (user == null) {
      return next(new AppError('User not found', 404))
    }

    req.user = user
    next()
  }
)

const branchExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { branchId } = req.params
    const branch = await Branch.findByPk(branchId)

    if (branch == null) {
      return next(new AppError('Branch not found', 404))
    }

    req.branch = branch
    next()
  }
)

const technologyExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { technologyId } = req.params
    const technology = await Technology.findByPk(technologyId)

    if (technology == null) {
      return next(new AppError('Technology not found', 404))
    }

    req.technology = technology
    next()
  }
)

export {
  userExists,
  branchExists,
  technologyExists
}
