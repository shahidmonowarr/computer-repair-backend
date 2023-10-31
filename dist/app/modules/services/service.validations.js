"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairServiceValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        serviceName: zod_1.z.string({
            required_error: 'Service Name is Required',
            invalid_type_error: 'Blog Title must be in String',
        }),
        description: zod_1.z.string({
            required_error: 'Description is Required',
            invalid_type_error: 'Description must be in String',
        }),
        servicePrice: zod_1.z.number({
            required_error: 'Service Price is Required',
            invalid_type_error: 'Service Price must be in Number',
        }),
    }),
});
exports.RepairServiceValidation = {
    createService,
};
