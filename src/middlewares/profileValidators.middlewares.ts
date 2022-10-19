import { body } from 'express-validator'
// Utils
import checkValidations from './checkValidators.middlewares'

const createUpdateValidators = [
  body('name')
    .isString()
    .withMessage('name must be a string')
    .notEmpty()
    .withMessage('name cannot be empty'),
  body('lastName')
    .isString()
    .withMessage('last Name must be a string')
    .notEmpty()
    .withMessage('last Name cannot be empty'),
  body('title')
    .isString()
    .withMessage('title  must be a string')
    .notEmpty()
    .withMessage('title  cannot be empty'),
  body('biography')
    .isString()
    .withMessage('biography  must be a string')
    .notEmpty()
    .withMessage('biography  cannot be empty'),
  checkValidations
]

export { createUpdateValidators }
