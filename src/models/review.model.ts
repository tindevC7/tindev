import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

// interface model reviews
// type ReviewValue = '1'|'2'|'3'|'4'|'5'

enum ReviewValue{
  A='1',
  B='2',
  C='3',
  D='4',
  E='5'
}
export interface ReviewAttributes{
  comment: string
  value: ReviewValue
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'comment'>{}

@Table
export default class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  @Column
  comment!: string

  @Column({
    type: DataType.ENUM(...Object.values(ReviewValue)),
    defaultValue: ReviewValue.C
  })
  value!: ReviewValue
}
