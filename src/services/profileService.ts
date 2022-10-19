import Profile, { ProfileAttributes } from '../models/profile.model'
import { Request } from 'express'
import { uploadProfileImg } from '../utils/firebase.util'

export const create = async (req: Request): Promise<Profile> => {
  const profile: ProfileAttributes = req.body
  const { sessionUser } = req
  const imgUrl = await uploadProfileImg(req.file as Express.Multer.File, sessionUser.id)
  profile.avatar = imgUrl
  const newProfile = await Profile.create(profile)
  return newProfile
}

export const deleteById = async (id: number): Promise<Number> => {
  return await Profile.destroy({ where: { id } })
}

export const getAll = async (): Promise<Profile[]> => {
  return await Profile.findAll()
}

export const getById = async (id: number | string): Promise<Profile | null> => {
  return await Profile.findByPk(id)
}

export const update = async (profile: Profile, profileUpdate: ProfileAttributes): Promise<Profile> => {
  return await profile.update(profileUpdate)
}

export default {
  create,
  deleteById,
  getAll,
  getById,
  update
}
