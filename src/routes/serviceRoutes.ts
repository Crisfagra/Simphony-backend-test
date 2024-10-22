import { Router } from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService } from '../controllers/serviceController';
import { validateDto } from '../middlewares/validate';
import { CreateServiceDto } from '../dto/serviceDto';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/services', authenticate, validateDto(CreateServiceDto), createService);
router.get('/services', authenticate, getAllServices);
router.get('/services/:id', authenticate, getServiceById);
router.put('/services/:id', authenticate, validateDto(CreateServiceDto), updateService);
router.delete('/services/:id', authenticate, deleteService);

export default router;