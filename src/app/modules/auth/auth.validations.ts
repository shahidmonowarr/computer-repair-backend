import { Role } from '@prisma/client';
import { z } from 'zod';

const ZodUserRoles = ['super_admin', 'admin', 'customer', 'technician'];

const createUser = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First Name must be in string',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last Name must be in string',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'email must be in string',
    }),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be in string',
    }),
    profileImage: z
      .string({
        required_error: 'Profile Image is required',
        invalid_type_error: 'Profile Image must be in string',
      })
      .optional(),
    expertise: z
      .string({
        invalid_type_error: 'Expertise must be in string',
      })
      .optional(),
    role: z
      .enum([...ZodUserRoles] as [string, ...string[]], {
        required_error: 'Role is Required',
        invalid_type_error: 'role must be in string',
      })
      .default(Role.customer),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required for Login',
      invalid_type_error: 'First Name must be in string',
    }),
    password: z.string({
      required_error: 'Password is required for login',
      invalid_type_error: 'Last Name must be in string',
    }),
  }),
});

export const AuthValidations = {
  createUser,
  loginUser,
};
