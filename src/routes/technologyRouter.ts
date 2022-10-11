import express from 'express'
import { getAllTechnologies, createTechnology, getTechnologyById, updateTechnologyById } from '../controllers/technology.controller'
import { createValidators, updateValidators } from '../middlewares/branchValidators.middlewares'
import { branchExists } from '../middlewares/exists.middlewares'

const branchRouter = express.Router()

// rutas de acceso
branchRouter
  .get('/', getAllTechnologies)
  .get('/:branchId', branchExists, getTechnologyById)
  .post('/', createValidators, createTechnology)
  .patch('/:branchId', updateValidators, branchExists, updateTechnologyById)

export default branchRouter
