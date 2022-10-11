import { Branch, Technology, User } from '../models'

// database interface
export interface DataBaseType {
  host: string
  name: string
  password: string
  port: number
  user: string
}
// global express interface
declare global {
  namespace Express {
    export interface Request {
      user: User
      branch: Branch
      technology: Technology
    }
  }
}
