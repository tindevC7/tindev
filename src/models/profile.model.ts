import { Column, Model, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

// interface model profile
export interface ProfileAttributes{
  id: number
  name: string
  lastName: string
  title: string
  biography: string
  avatar: string
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'>{}

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
}
