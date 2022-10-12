import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'
import { DataBaseType } from '../interfaces/types'
import { Branch, Match, Profile, Review, Role, Technology, User } from '../models'

dotenv.config({ path: './config.env' })

const server: DataBaseType = {
  host: process.env.DB_HOST ?? '',
  name: process.env.DB ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: Number(process.env.DB_PORT ?? 0),
  user: process.env.DB_USERNAME ?? ''
}

const db = new Sequelize({
  database: server.name,
  dialect: 'postgres',
  username: server.user,
  password: server.password,
  logging: false,
  host: server.host,
  port: server.port,
  dialectOptions:
    process.env.NODE_ENV === 'production'
      ? { ssl: { required: true, rejectUnauthorized: false } }
      : {},
  models: [Branch, Match, Profile, Review, Role, Technology, User]
})

export {
  db
}
