import { z } from 'zod';
import { isValidISOString } from '../../../shared/utils';

const createBooking = z.object({
  body: z.object({
    bookingDate: z
      .string({
        required_error: 'Appointment Date is required',
      })
      .refine(value => isValidISOString(value)),
    slotId: z.string({
      required_error: 'Slot Id is required',
      invalid_type_error: 'Slot id must be in   string',
    }),
    serviceId: z.string({
      required_error: 'Service Id is required',
      invalid_type_error: 'Service id must be in string',
    }),
  }),
});

export const BookingValidation = {
  createBooking,
};
