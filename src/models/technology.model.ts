import { Table, Model, Column, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

// interface model technology
export interface TechnologyAttributes{
  id: number
  name: string
}

interface TechnologyCreationAttributes extends Optional<TechnologyAttributes, 'id'>{}

@Table
export default class technology extends Model<TechnologyAttributes, TechnologyCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string
}
