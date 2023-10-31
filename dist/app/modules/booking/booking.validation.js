"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../../shared/utils");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        bookingDate: zod_1.z
            .string({
            required_error: 'Appointment Date is required',
        })
            .refine(value => (0, utils_1.isValidISOString)(value)),
        slotId: zod_1.z.string({
            required_error: 'Slot Id is required',
            invalid_type_error: 'Slot id must be in   string',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
            invalid_type_error: 'Service id must be in string',
        }),
    }),
});
exports.BookingValidation = {
    createBooking,
};
