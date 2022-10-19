import { Response, Request, NextFunction } from 'express'
import { ProfileAttributes } from '../models/profile.model'
import { AppError } from '../utils/appError.util'
import { create, createBulk, deleteById, getAll, update } from '../services/profileService'
import { catchAsync } from '../utils/catchAsync.util'
import { uploadProfileImg } from '../utils/firebase.util'

const createProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const profile: ProfileAttributes = req.body
  const { user, sessionUser, file } = req
  let imgUrl
  if (file === undefined) {
    next(new AppError('Error loading profile picture ', 500))
  } else {
    imgUrl = await uploadProfileImg(file, sessionUser.id)
    profile.avatar = imgUrl
  }
  const data = await create(user, profile)

  res.status(201).json({
    status: 'success',
    data
  })
})

const createBulkProfile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const profiles: ProfileAttributes[] = req.body.profiles

  const data = await createBulk(profiles)
  res.status(201).json({
    status: 'success',
    data
  })
})

const deleteProfileById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { profile } = req

  await deleteById(profile.id)

  res.status(200).json({
    status: 'success',
    msg: 'The profile was removed'
  })
})

const getAllProfiles = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const data = await getAll(req)
  res.status(200).json({
    status: 'success',
    data
  })
}
)

const getProfileById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { profile } = req

  res.status(200).json({
    status: 'success',
    data: profile
  })
})

const updateProfileById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const profileUpdate: ProfileAttributes = req.body
  const { profile } = req

  const data = await update(profile, profileUpdate)

  res.status(200).json({
    status: 'success',
    data
  })
})

export {
  createProfile,
  createBulkProfile,
  deleteProfileById,
  getAllProfiles,
  getProfileById,
  updateProfileById
}
