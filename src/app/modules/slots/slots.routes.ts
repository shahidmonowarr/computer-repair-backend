import express from 'express';
import { SlotController } from './slots.controller';

const router = express.Router();

router.post('/create', SlotController.createNewSlot);
router.get('/:slotId', SlotController.getSingleSlot);
router.get('/', SlotController.getAllSlots);

router.patch('/:slotId', SlotController.updateSlot);
router.delete('/:slotId', SlotController.deleteSlot);

export const SlotRoutes = router;
