import Technology, { TechnologyAttributes } from '../models/technology.model'

const create = async (technology: TechnologyAttributes): Promise<Technology> => {
  return await Technology.create({
    name: technology.name
  })
}

const update = async (technology: Technology, technologyUpdate: TechnologyAttributes): Promise<Technology> => {
  return await technology.update(technologyUpdate)
}

const getById = async (id: number): Promise<Technology | null> => {
  return await Technology.findByPk(id)
}

const getAll = async (): Promise<Technology[]> => {
  return await Technology.findAll()
}

export {
  create,
  update,
  getById,
  getAll
}
