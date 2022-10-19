import express from 'express'
import { createProfile, deleteProfileById, getAllProfiles, getProfileById, updateProfileById } from '../controllers/profile.controller'
import { createUpdateValidators } from '../middlewares/profileValidators.middlewares'
import { profileExists, userExists } from '../middlewares/exists.middlewares'
import { upload } from '../utils/multer.util'
import { protectSession } from '../middlewares/auth.middlewares'

const profileRouter = express.Router()

// rutas de acceso
profileRouter
  .use(protectSession)
  .delete('/:profileId', profileExists, deleteProfileById)
  .get('/', getAllProfiles)
  .get('/:profileId', profileExists, getProfileById)
  .patch('/:profileId', createUpdateValidators, profileExists, updateProfileById)
  .post('/:userId', userExists, upload.single('avatar'), createProfile)

export default profileRouter
