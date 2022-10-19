import { Response, Request, NextFunction } from 'express'
import { RoleAttributes } from '../models/role.model'
import { create, createBulk, deleteById, getAll, update } from '../services/roleService'
import { catchAsync } from '../utils/catchAsync.util'

const createRole = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const role: RoleAttributes = req.body

  const data = await create(role)

  res.status(201).json({
    status: 'success',
    data
  })
})

const createBulkRole = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const role: RoleAttributes[] = req.body

  const data = await createBulk(role)

  res.status(201).json({
    status: 'success',
    data
  })
})

const deleteRoleById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { role } = req

  await deleteById(role.id)

  res.status(200).json({
    status: 'success',
    msg: 'The role was removed'
  })
})

const getAllRoles = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const data = await getAll()

  res.status(200).json({
    status: 'success',
    data
  })
}
)

const getRoleById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { role } = req

  res.status(200).json({
    status: 'success',
    data: role
  })
})

const updateRoleById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const roleUpdate: RoleAttributes = req.body
  const { role } = req

  const data = await update(role, roleUpdate)

  res.status(200).json({
    status: 'success',
    data
  })
})

export {
  createRole,
  createBulkRole,
  deleteRoleById,
  getAllRoles,
  getRoleById,
  updateRoleById
}
