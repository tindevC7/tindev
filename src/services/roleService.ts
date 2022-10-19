import Role, { RoleAttributes } from '../models/role.model'

export const create = async (role: RoleAttributes): Promise<Role> => {
  return await Role.create(role)
}

export const createBulk = async (roles: RoleAttributes[]): Promise<RoleAttributes[]> => {
  return await Role.bulkCreate(roles)
}

export const deleteById = async (id: number): Promise<Number> => {
  return await Role.destroy({ where: { id } })
}

export const getAll = async (): Promise<Role[]> => {
  return await Role.findAll()
}

export const getById = async (id: number | string): Promise<Role | null> => {
  return await Role.findByPk(id)
}

export const update = async (role: Role, roleUpdate: RoleAttributes): Promise<Role> => {
  return await role.update(roleUpdate)
}

export default {
  create,
  createBulk,
  deleteById,
  getAll,
  getById,
  update
}
