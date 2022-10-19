import { Match, Profile, Review, Role, Technology, User } from '../models'

const initModels = (): void => {
  // USER N<=>M USER => MATCH => GENERATE AUT INTERMEDIATE TABLE
  User.belongsToMany(User, { through: Match, as: 'UserMatch' })
  // USER N<=>M USER => REVIEWS // RESTRICCION DE 1 POR USUARIO
  User.belongsToMany(User, { through: Review, as: 'UserReview' })
  // USER 1<=>1 PROFILE => PROFILE DETAILS => GENERATE AUT INTERMEDIATE TABLE
  User.hasOne(Profile)
  Profile.belongsTo(User)
  // USER N<=>M ROLE => ROLS => GENERATE AUT INTERMEDIATE TABLE
  User.belongsToMany(Role, { through: 'User_Roles', as: 'UserRole' })
  Role.belongsToMany(User, { through: 'User_Roles', as: 'UserRole' })
  // PROFILE N<=>M TECHNOLOGY => GENERATE AUT INTERMEDIATE TABLE
  Profile.belongsToMany(Technology, { through: 'Profile_Technologies', as: 'ProfileTechnology' })
  Technology.belongsToMany(Profile, { through: 'Profile_Technologies', as: 'ProfileTechnology' })
}

export default initModels
