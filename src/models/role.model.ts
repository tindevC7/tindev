import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

enum AccessLevel{
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

// interface model role
export interface RoleAttributes{
  id?: number
  accessLevel: AccessLevel
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' >{}

@Table
export default class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @Column({
    type: DataType.ENUM(...Object.values(AccessLevel)),
    allowNull: false,
    defaultValue: AccessLevel.CLIENT
  })
  accessLevel!: AccessLevel
}
