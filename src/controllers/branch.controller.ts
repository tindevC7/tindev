import { Response, Request, NextFunction } from 'express'
import { BranchAttributes } from '../models/branch.model'
import { create, getAll, update } from '../services/branchService'
import { catchAsync } from '../utils/catchAsync.util'

const getAllBranchs = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const data = await getAll()

  res.status(200).json({
    status: 'success',
    data
  })
}
)

const getBranchById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { branch } = req

  res.status(200).json({
    status: 'success',
    data: branch
  })
})

const createBranch = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const branch: BranchAttributes = req.body

  const data = await create(branch)

  res.status(201).json({
    status: 'success',
    data
  })
})

const updateBranchById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const branchUpdate: BranchAttributes = req.body
  const { branch } = req

  const data = await update(branch, branchUpdate)

  res.status(200).json({
    status: 'success',
    data
  })
})

export {
  getAllBranchs,
  getBranchById,
  createBranch,
  updateBranchById
}
