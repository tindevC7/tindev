import Branch, { BranchAttributes } from '../models/branch.model'

const create = async (branch: BranchAttributes): Promise<Branch> => {
  return await Branch.create({
    name: branch.name
  })
}

const update = async (branch: Branch, branchUpdate: BranchAttributes): Promise<Branch> => {
  return await branch.update(branchUpdate)
}

const getById = async (id: number): Promise<Branch | null> => {
  return await Branch.findByPk(id)
}

const getAll = async (): Promise<Branch[]> => {
  return await Branch.findAll()
}

export {
  create,
  update,
  getById,
  getAll
}
