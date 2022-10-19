import { Response, Request, NextFunction } from 'express'
import { TechnologyAttributes } from '../models/technology.model'
import { create, deleteById, getAll, update } from '../services/technologyService'
import { catchAsync } from '../utils/catchAsync.util'

const createTechnology = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const technology: TechnologyAttributes = req.body

  const data = await create(technology)

  res.status(201).json({
    status: 'success',
    data
  })
})

const deleteTechnologyById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { technology } = req

  await deleteById(technology.id)

  res.status(200).json({
    status: 'success',
    msg: 'The technology was removed'
  })
})

const getAllTechnologies = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const data = await getAll()

  res.status(200).json({
    status: 'success',
    data
  })
}
)

const getTechnologyById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { technology } = req

  res.status(200).json({
    status: 'success',
    data: technology
  })
})

const updateTechnologyById = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const technologyUpdate: TechnologyAttributes = req.body
  const { technology } = req

  const data = await update(technology, technologyUpdate)

  res.status(200).json({
    status: 'success',
    data
  })
})

export {
  createTechnology,
  deleteTechnologyById,
  getAllTechnologies,
  getTechnologyById,
  updateTechnologyById
}
