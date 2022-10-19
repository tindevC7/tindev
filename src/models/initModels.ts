import Profile from './profile.model'
import Review from './review.model'
import Role from './role.model'
import Technology from './technology.model'
import User from './user.model'

const initModels = (): void => {
  // USER N<=>M USER => MATCH => GENERATE AUT INTERMEDIATE TABLE
  // User.belongsToMany(User, { through: Match, as: 'UserMatch' })
  // USER N<=>M USER => REVIEWS // RESTRICCION DE 1 POR USUARIO
  User.belongsToMany(User, { through: Review, as: 'UserReview' })
  // USER 1<=>1 PROFILE => PROFILE DETAILS => GENERATE AUT INTERMEDIATE TABLE
  User.hasOne(Profile)
  Profile.belongsTo(User)
  // USER N<=>M ROLE => ROLS => GENERATE AUT INTERMEDIATE TABLE
  User.belongsToMany(Role, { through: 'user_roles' })
  Role.belongsToMany(User, { through: 'user_roles' })
  // PROFILE N<=>M TECHNOLOGY => GENERATE AUT INTERMEDIATE TABLE
  Profile.belongsToMany(Technology, { through: 'Profile_Technologies' })
  Technology.belongsToMany(Profile, { through: 'Profile_Technologies' })
}

export default initModels
