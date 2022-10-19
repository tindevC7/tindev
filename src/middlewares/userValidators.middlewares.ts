import { body } from 'express-validator'
import checkValidations from './checkValidators.middlewares'

// Utils
const createOrUpdateUserValidators = [
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations
]

// const updateUserValidators = [
//   body('status') // admin or client
//     .isString()
//     .withMessage('status must be a string')
//     .notEmpty()
//     .withMessage('status cannot be empty')
//     .isIn(['active', 'inactive'])
//     .withMessage('status must be active or inactive'),
//   checkValidations
// ]

export { createOrUpdateUserValidators }
