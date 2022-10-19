import Review, { ReviewAttributes } from '../models/review.model'

export const create = async (review: ReviewAttributes, UserId: number, UserReviewId: number): Promise<Review> => {
  return await Review.create({
    comment: review.comment,
    value: review.value,
    UserId,
    UserReviewId
  })
}

export const getAll = async (UserReviewId: number): Promise<Review[]> => {
  return await Review.findAll({ where: { UserReviewId } })
}

export const update = async (review: Review, reviewUpdate: ReviewAttributes): Promise<Review> => {
  return await review.update({ comment: reviewUpdate.comment, value: reviewUpdate.value })
}

export const destroy = async (review: Review): Promise<void> => {
  await review.destroy()
}

export default { create, getAll, update, destroy }
