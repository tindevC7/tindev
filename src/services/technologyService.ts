import Technology, { TechnologyAttributes } from '../models/technology.model'

export const create = async (technology: TechnologyAttributes): Promise<Technology> => {
  return await Technology.create(technology)
}

export const createBulk = async (technology: TechnologyAttributes[]): Promise<Technology[]> => {
  return await Technology.bulkCreate(technology)
}

export const deleteById = async (id: number): Promise<Number> => {
  return await Technology.destroy({ where: { id } })
}

export const getAll = async (): Promise<Technology[]> => {
  return await Technology.findAll()
}

export const getById = async (id: number | string): Promise<Technology | null> => {
  return await Technology.findByPk(id)
}

export const update = async (technology: Technology, technologyUpdate: TechnologyAttributes): Promise<Technology> => {
  return await technology.update(technologyUpdate)
}

export default {
  create,
  createBulk,
  deleteById,
  getAll,
  getById,
  update
}
