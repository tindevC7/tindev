
import bcrypt from 'bcryptjs'
import User, { UserAttributes, UserStatus } from '../models/user.model'
// import { AppError } from '../utils/appError.util'

const create = async (user: UserAttributes): Promise<User> => {
  const hashedPassword = await passwordHasher(user.password)
  const newUser = await User.create({
    email: user.email,
    password: hashedPassword,
    status: UserStatus.active
  })

  return newUser
}

const update = async (user: User, userUpdate: UserAttributes): Promise<User> => {
  const data = await user.update(userUpdate)
  return data
}

const passwordHasher = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

const getById = async (id: number): Promise<User | null> => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  })
  return user
}

const getAll = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' }
  })
  return users
}

export {
  create,
  update,
  passwordHasher,
  getById,
  getAll
}
