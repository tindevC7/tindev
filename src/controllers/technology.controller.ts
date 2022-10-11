import { Response, Request, NextFunction } from 'express'
import { TechnologyAttributes } from '../models/technology.model'
import { create, getAll, update } from '../services/technologyService'
import { catchAsync } from '../utils/catchAsync.util'

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

const createTechnology = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const technology: TechnologyAttributes = req.body

  const data = await create(technology)

  res.status(201).json({
    status: 'success',
    data
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
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnologyById
}
