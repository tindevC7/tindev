import { Column, DataType, Model, Table } from 'sequelize-typescript'

import { Optional } from 'sequelize/types'

// interface model branch
export interface TechnologyAttributes{
  id: number
  name: string
}

interface TechnologyCreationAttributes extends Optional<TechnologyAttributes, 'id' >{}

@Table
export default class Technology extends Model<TechnologyAttributes, TechnologyCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string
}
