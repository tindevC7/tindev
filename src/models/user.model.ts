import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

export enum UserStatus{
  active='active',
  inactive='inactive'
}

// interface model usuarios
export interface UserAttributes{
  id: number
  email: string
  password: string | undefined
  status: UserStatus
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' > {}
@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @AllowNull(false)
  @Column({ unique: true })
  email!: string

  @AllowNull(false)
  @Column
  password!: string

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.active,
    allowNull: false
  })
  status!: UserStatus
}
