import { body } from 'express-validator'
// Utils
import checkValidations from './checkValidators.middlewares'

const createUpdateValidators = [
  body('name')
    .isString()
    .withMessage('name must be a string')
    .notEmpty()
    .withMessage('name cannot be empty'),
  checkValidations
]
export { createUpdateValidators }
