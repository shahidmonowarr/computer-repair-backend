import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { RepairServiceController } from './service.controller';

const router = express.Router();

router.post(
  '/create',
  auth(Role.admin, Role.super_admin),
  RepairServiceController.createNewService
);
router.get('/:serviceId', RepairServiceController.getSingleService);
router.get('/', RepairServiceController.getAllServices);

router.patch(
  '/:serviceId',
  auth(Role.admin, Role.super_admin),
  RepairServiceController.updateService
);
router.delete(
  '/:serviceId',
  auth(Role.admin, Role.super_admin),
  RepairServiceController.deleteService
);

export const RepairServiceRoutes = router;
