import { body } from 'express-validator'
// Utils
import checkValidations from './checkValidators.middlewares'
const createValidators = [
  body('accessLevel')
    .isString()
    .withMessage('AccessLevel must be a string')
    .notEmpty()
    .withMessage('AccessLevel cannot be empty'),
  checkValidations
]

const updateValidators = [
  body('accessLevel')
    .isString()
    .withMessage('AccessLevel must be a string')
    .notEmpty()
    .withMessage('AccessLevel cannot be empty'),
  checkValidations
]

export { createValidators, updateValidators }
