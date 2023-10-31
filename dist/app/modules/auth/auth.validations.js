"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZodUserRoles = ['super_admin', 'admin', 'customer', 'technician'];
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: 'First name is required',
            invalid_type_error: 'First Name must be in string',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last name is required',
            invalid_type_error: 'Last Name must be in string',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
            invalid_type_error: 'email must be in string',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
            invalid_type_error: 'password must be in string',
        }),
        profileImage: zod_1.z
            .string({
            required_error: 'Profile Image is required',
            invalid_type_error: 'Profile Image must be in string',
        })
            .optional(),
        expertise: zod_1.z
            .string({
            invalid_type_error: 'Expertise must be in string',
        })
            .optional(),
        role: zod_1.z
            .enum([...ZodUserRoles], {
            required_error: 'Role is Required',
            invalid_type_error: 'role must be in string',
        })
            .default(client_1.Role.customer),
    }),
});
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is Required for Login',
            invalid_type_error: 'First Name must be in string',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required for login',
            invalid_type_error: 'Last Name must be in string',
        }),
    }),
});
exports.AuthValidations = {
    createUser,
    loginUser,
};
