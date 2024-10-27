import { Router } from 'express'
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/serviceController'
import { validateDto } from '../middlewares/validate'
import { CreateServiceDto } from '../dto/serviceDto'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.post('/', authenticate, validateDto(CreateServiceDto), createService)
router.get('/', authenticate, getAllServices)
router.get('/:id', authenticate, getServiceById)
router.put('/:id', authenticate, validateDto(CreateServiceDto), updateService)
router.delete('/:id', authenticate, deleteService)

export default router
