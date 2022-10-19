import { Column, Model, Table, Unique } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

// interface model profile
export interface ProfileAttributes{
  id?: number
  name: string
  lastName: string
  title: string
  biography: string
  avatar: string
  UserId?: number
  TechIds?: number[]
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id' | 'UserId'>{}

@Table
export default class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> {
  @Column
  name!: string

  @Column
  lastName!: string

  @Column
  title!: string

  @Column
  biography!: string

  @Column
  avatar!: string

  @Unique
  @Column
  UserId!: number
}
