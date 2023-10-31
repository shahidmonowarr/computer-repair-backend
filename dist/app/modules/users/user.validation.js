"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ invalid_type_error: 'Email  must be valid in string' })
            .optional(),
        password: zod_1.z
            .string({ invalid_type_error: 'Password must be in string' })
            .optional(),
    }),
});
exports.UserValidation = {
    updateUser,
};
