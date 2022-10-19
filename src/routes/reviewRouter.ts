import express from 'express'
import { createBulkReview, createReview, deleteReview, getUsersReviews, updateReview } from '../controllers/reviews.controller'
import { protectSession, protectUsersReview } from '../middlewares/auth.middlewares'
import { reviewExists, userExists } from '../middlewares/exists.middlewares'
import { createValidators, updateValidators } from '../middlewares/reviewValidators.middlewares'

const reviewRouter = express.Router()

// Acces Routes
reviewRouter
  .use(protectSession)
  .delete('/:UserId/:UserReviewId', reviewExists, protectUsersReview, deleteReview)
  .get('/:userId', userExists, getUsersReviews)
  .post('/:UserReviewId', createValidators, createReview)
  .post('/bulk', createBulkReview)
  .patch('/:UserId/:UserReviewId', updateValidators, reviewExists, protectUsersReview, updateReview)

export default reviewRouter
