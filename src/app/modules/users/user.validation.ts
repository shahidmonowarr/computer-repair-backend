import { z } from 'zod';

const updateUser = z.object({
  body: z.object({
    email: z
      .string({ invalid_type_error: 'Email  must be valid in string' })
      .optional(),
    password: z
      .string({ invalid_type_error: 'Password must be in string' })
      .optional(),
  }),
});

export const UserValidation = {
  updateUser,
};
