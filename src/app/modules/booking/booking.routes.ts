import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/create',
  auth(Role.customer),
  validateRequest(BookingValidation.createBooking),
  bookingController.createNewBooking
);

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
