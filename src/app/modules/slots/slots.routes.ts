import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SlotController } from './slots.controller';
import { SlotValidation } from './slots.validations';

const router = express.Router();

router.post(
  '/create',
  auth(Role.customer),
  validateRequest(SlotValidation.createSlot),
  SlotController.createNewSlot
);
router.get('/:slotId', SlotController.getSingleSlot);
router.get('/', SlotController.getAllSlots);

router.patch(
  '/:slotId',
  auth(Role.admin, Role.super_admin),
  SlotController.updateSlot
);
router.delete(
  '/:slotId',
  auth(Role.admin, Role.super_admin),
  SlotController.deleteSlot
);

export const SlotRoutes = router;
