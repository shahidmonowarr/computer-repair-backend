"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidation = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../../shared/utils");
const createSlot = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z
            .string({
            required_error: 'StarTime is required',
            invalid_type_error: 'Start Time must be in  Date string',
        })
            .refine(value => (0, utils_1.isValidISOString)(value)),
        endTime: zod_1.z
            .string({
            required_error: 'End Time is required',
            invalid_type_error: 'End Time must be in Date string',
        })
            .refine(value => (0, utils_1.isValidISOString)(value)),
    }),
});
exports.SlotValidation = {
    createSlot,
};
