import { Request, Response, NextFunction } from 'express'
// Models
import { Profile, Review, User } from '../models'

// Utils
import { catchAsync } from '../utils/catchAsync.util'
import { AppError } from '../utils/appError.util'
import { profileService, roleService, technologyService } from '../services'

// Services

export const profileExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { profileId } = req.params
    const profile = await profileService.getById(profileId)

    if (profile == null) {
      return next(new AppError('Profile not found', 404))
    }
    req.profile = profile
    next()
  }
)

export const roleExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { roleId } = req.params
    const role = await roleService.getById(roleId)

    if (role == null) {
      return next(new AppError('Role not found', 404))
    }

    req.role = role
    next()
  }
)

export const technologyExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { technologyId } = req.params
    const technology = await technologyService.getById(technologyId)

    if (technology == null) {
      return next(new AppError('Technology not found', 404))
    }

    req.technology = technology
    next()
  }
)

export const reviewExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { UserId, UserReviewId } = req.params
    const review = await Review.findOne({ where: { UserReviewId, UserId } })

    if (review == null) {
      return next(new AppError('Review not found', 404))
    }

    req.review = review
    next()
  })

export const userExists = catchAsync(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: userId }, include: { model: Profile } })

    if (user == null) {
      return next(new AppError('User not found', 404))
    }

    req.user = user
    next()
  }
)

export default {
  technologyExists,
  reviewExists,
  profileExists,
  roleExists,
  userExists
}
