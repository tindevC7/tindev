import express from 'express'
import { createBulkRole, createRole, deleteRoleById, getAllRoles, getRoleById, updateRoleById } from '../controllers/role.controller'
import { createValidators, updateValidators } from '../middlewares/roleValidators.middlewares'
import { roleExists } from '../middlewares/exists.middlewares'

const roleRouter = express.Router()

// rutas de acceso
roleRouter
  .delete('/:roleId', roleExists, deleteRoleById)
  .get('/', getAllRoles)
  .get('/:roleId', roleExists, getRoleById)
  .patch('/:roleId', updateValidators, roleExists, updateRoleById)
  .post('/', createValidators, createRole)
  .post('/bulk', createBulkRole)

export default roleRouter
