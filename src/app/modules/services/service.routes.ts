import express from 'express';
import { RepairServiceController } from './service.controller';

const router = express.Router();

router.post('/create', RepairServiceController.createNewService);
router.get('/:serviceId', RepairServiceController.getSingleService);
router.get('/', RepairServiceController.getAllServices);

router.patch('/:serviceId', RepairServiceController.updateService);
router.delete('/:serviceId', RepairServiceController.deleteService);

export const RepairServiceRoutes = router;
