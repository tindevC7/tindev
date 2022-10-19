import { body } from 'express-validator'
// Utils
import checkValidations from './checkValidators.middlewares'

const createValidators = [
  body('comment')
    .isString()
    .withMessage('comment must be a string')
    .notEmpty()
    .withMessage('comment cannot be empty'),
  body('value')
    .isInt({ min: 0, max: 5 })
    .withMessage('value must be an integer from 0 to 5')
    .notEmpty()
    .withMessage('value cannot be empty')
]

const updateValidators = [
  body('comment')
    .isString()
    .withMessage('comment must be a string')
    .notEmpty()
    .withMessage('comment cannot be empty'),
  body('value')
    .isInt({ min: 0, max: 5 })
    .withMessage('value must be an integer from 0 to 5')
    .notEmpty()
    .withMessage('value cannot be empty'),
  checkValidations
]

export { createValidators, updateValidators }
