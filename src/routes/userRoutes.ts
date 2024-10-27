import { Router } from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  associateServicesToUser,
  getUserServices,
  deleteUser,
} from '../controllers/userController'
import { authenticate } from '../middlewares/auth'
import { validateDto } from '../middlewares/validate'
import { CreateUserDto } from '../dto/userDto'
import { AddServicesToUserDto } from '../dto/userServiceDto'

const router = Router()

router.post('/register', authenticate, validateDto(CreateUserDto), registerUser)
router.post('/login', loginUser)
router.get('/profile', authenticate, getUserProfile)
router.get('/:id/services', authenticate, getUserServices)
router.post('/:id/services', authenticate, validateDto(AddServicesToUserDto), associateServicesToUser)
router.delete('/:id', authenticate, deleteUser)

export default router
