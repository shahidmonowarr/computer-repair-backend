import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post('/create', auth(Role.customer), bookingController.createNewBooking);

router.get(
  '/',

  auth(Role.super_admin, Role.admin, Role.customer),
  bookingController.getAllBookings
);

router.patch(
  '/:bookingId',
  auth(Role.super_admin, Role.admin, Role.customer),
  bookingController.updateBooking
);

router.delete(
  '/:bookingId',
  auth(Role.super_admin, Role.admin, Role.customer),
  bookingController.deleteBooking
);

export const bookingRoutes = router;
