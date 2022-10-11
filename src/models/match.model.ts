import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

// interface model match
enum MatchStatus{
  pending='pending',
  success='success',
  rejected='rejected'
}
// type matchStatus = 'pending' | 'success' | 'rejected'
export interface MatchAttributes{
  status: MatchStatus
}

interface MatchCreationAttributes extends Optional<MatchAttributes, 'status'>{}

@Table
export default class Match extends Model<MatchAttributes, MatchCreationAttributes> {
  @Column({
    type: DataType.ENUM(...Object.values(MatchStatus)),
    defaultValue: MatchStatus.pending,
    allowNull: false
  })
  status!: MatchStatus
}
