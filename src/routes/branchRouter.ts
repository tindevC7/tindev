import express from 'express'
import { getAllBranchs, createBranch, getBranchById, updateBranchById } from '../controllers/branch.controller'
import { createValidators, updateValidators } from '../middlewares/branchValidators.middlewares'
import { branchExists } from '../middlewares/exists.middlewares'

const branchRouter = express.Router()

// rutas de acceso
branchRouter
  .get('/', getAllBranchs)
  .get('/:branchId', branchExists, getBranchById)
  .post('/', createValidators, createBranch)
  .patch('/:branchId', updateValidators, branchExists, updateBranchById)

export default branchRouter
