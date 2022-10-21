import { Request } from 'express'
import { Op } from 'sequelize'
import { Technology, User } from '../models'
import Profile, { ProfileAttributes } from '../models/profile.model'

export const create = async (user: User, profile: ProfileAttributes): Promise<Profile> => {
  const newProfile = await Profile.create({ ...profile, UserId: user.id })
  await newProfile.$add('Technology', profile.TechIds ?? [])
  return newProfile
}

export const createBulk = async (profiles: ProfileAttributes[]): Promise<ProfileAttributes[]> => {
  const newsProfiles = await Profile.bulkCreate(profiles)

  for (let idx = 0; idx < profiles.length; idx++) {
    await newsProfiles[idx].$add('Technology', profiles[idx].TechIds ?? [])
  }

  return newsProfiles
}

export const deleteById = async (id: number): Promise<Number> => {
  return await Profile.destroy({ where: { id } })
}

export const getAll = async (req: Request): Promise<Profile[]> => {
  const { name, title, limit, offset, filterTechnologies } = req.query
  let where
  let whereTechnologies
  let technologies: string[]
  // let branches: string[]
  if (filterTechnologies !== undefined) {
    technologies = (JSON.parse(filterTechnologies as string))
    whereTechnologies = {
      id: {
        [Op.in]: technologies
      }
    }

    // if (filterBranches !== undefined) {
    //   branches = (JSON.parse(filterBranches as string))
    //   console.log(branches)
    //   where = {
    //     [Op.or]: branches.map((tech) => { return { title: { [Op.iLike]: `%${tech}%` } } })
    //   }
    // }
  }

  const paginate = {
    limit: limit !== undefined ? Number(limit) : 999999,
    offset: offset !== undefined ? (Number(offset) - 1) * Number(limit) : 0
  }

  if (title !== undefined && name !== undefined) {
    where = {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${name as string}%`
        },
        lastName: {
          [Op.iLike]: `%${name as string}%`
        },
        title: {
          [Op.iLike]: `%${title as string}%`
        }
      }
    }
  } else if (title !== undefined) {
    where = {
      title: {
        [Op.iLike]: `%${title as string}%`
      }
    }
  } else if (name !== undefined) {
    where = {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${name as string}%`
        },
        lastName: {
          [Op.iLike]: `%${name as string}%`
        }
      }
    }
  }

  return await Profile.findAll({
    include: [{
      model: Technology,
      through: {
        attributes: []
      },
      where: whereTechnologies
    }, {
      model: User
    }],
    where,
    ...paginate
  })
}

export const getPaginate = async (limit?: string, offset?: string): Promise<Profile[]> => {
  const paginate = {
    limit: Number(limit),
    offset: (Number(offset) - 1) * Number(limit)
  }

  return await Profile.findAll({
    include: {
      model: Technology,
      through: {
        attributes: []
      }
    },
    ...paginate
  })
}

export const getById = async (id: number | string): Promise<Profile | null> => {
  return await Profile.findByPk(id, {
    include: [{
      model: Technology,
      through: {
        attributes: []
      }
    }, {
      model: User
    }]
  })
}

export const getByNameOrLastName = async (query: string): Promise<Profile[]> => {
  return await Profile.findAll({
    include: {
      model: Technology,
      through: {
        attributes: []
      }
    },
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${query}%`
        },
        lastName: {
          [Op.iLike]: `%${query}%`
        }
      }
    }
  })
}

export const getByTitle = async (query: string): Promise<Profile[]> => {
  return await Profile.findAll({
    include: {
      model: Technology,
      through: {
        attributes: []
      }
    },
    where: {
      title: {
        [Op.iLike]: `%${query}%`
      }
    }
  })
}

export const update = async (profile: Profile, profileUpdate: ProfileAttributes): Promise<Profile> => {
  return await profile.update(profileUpdate)
}

export default {
  create,
  deleteById,
  getAll,
  getByNameOrLastName,
  getByTitle,
  getById,
  getPaginate,
  update,
  createBulk
}
