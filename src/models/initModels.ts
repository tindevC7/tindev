import { Branch, Match, Profile, Review, Role, Technology, User } from '../models'

const initModels = (): void => {
  // USER N<=>M USER => MATCH => GENERATE AUT INTERMEDIATE TABLE
  User.belongsToMany(User, { through: Match, as: 'UserMatch' })
  // USER N<=>M USER => REVIEWS // RESTRICCION DE 1 POR USUARIO
  User.belongsToMany(User, { through: Review, as: 'UserReview' })
  // USER 1<=>1 PROFILE => PROFILE DETAILS => GENERATE AUT INTERMEDIATE TABLE
  User.hasOne(Profile)
  Profile.belongsTo(User)
  // USER N<=>M ROLE => ROLS => GENERATE AUT INTERMEDIATE TABLE
  User.belongsToMany(Role, { through: 'User_Role', as: 'UserRole' })
  Role.belongsToMany(User, { through: 'User_Role', as: 'UserRole' })
  // PROFILE N<=>M TECHNOLOGY => GENERATE AUT INTERMEDIATE TABLE
  Profile.belongsToMany(Technology, { through: 'Profile_Technology', as: 'ProfileTechnology' })
  Technology.belongsToMany(Profile, { through: 'Profile_Technology', as: 'ProfileTechnology' })
  // TECHNOLOGY N <=> M BRANCH => GENERATE AUT INTERMEDIATE TABLE
  Technology.belongsToMany(Branch, { through: 'Technology_Branch', as: 'TechnologyBranch' })
  Branch.belongsToMany(Technology, { through: 'Technology_Branch', as: 'TechnologyBranch' })
}

export default initModels
