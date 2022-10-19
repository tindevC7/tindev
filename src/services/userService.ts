import bcrypt from 'bcryptjs'
import { Profile, Role } from '../models'
import User, { UserAttributes, UserStatus } from '../models/user.model'
// import { AppError } from '../utils/appError.util'

export const create = async (user: UserAttributes): Promise<User> => {
  const hashedPassword = await passwordHasher(user.password ?? '')
  const newUser = await User.create({
    ...user,
    password: hashedPassword
  })
  await newUser.$add('Role', 1)
  return newUser
}

export const createBulk = async (users: UserAttributes[]): Promise<UserAttributes[]> => {
  for (const user of users) {
    const hashedPassword = await passwordHasher(user.password ?? '')
    user.password = hashedPassword
  }
  const newUsers = await User.bulkCreate(users)

  for (const user of newUsers) {
    await user.$add('Role', 1)
  }

  return newUsers
}

export const update = async (user: User, userUpdate: UserAttributes): Promise<User> => {
  const hashedPassword = await passwordHasher(user.password)
  const data = await user.update({
    email: userUpdate.email,
    password: hashedPassword
  })
  return data
}

export const remove = async (user: User): Promise<User> => {
  return await user.update({
    status: UserStatus.inactive
  })
}

export const getAll = async (): Promise<User[]> => {
  return await User.findAll({
    include: [{
      model: Role,
      through: {
        attributes: []
      }
    }, { model: Profile }],
    attributes: { exclude: ['password'] },
    where: { status: UserStatus.active }
  })
}

export const getById = async (id: number | string): Promise<User | null> => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  })
}

export const getByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email, status: UserStatus.active } })
}

const passwordHasher = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export default {
  create,
  createBulk,
  update,
  remove,
  passwordHasher,
  getById,
  getByEmail,
  getAll
}
