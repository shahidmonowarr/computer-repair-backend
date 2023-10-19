import { z } from 'zod';

const createService = z.object({
  body: z.object({
    serviceName: z.string({
      required_error: 'Service Name is Required',
      invalid_type_error: 'Blog Title must be in String',
    }),
    description: z.string({
      required_error: 'Description is Required',
      invalid_type_error: 'Description must be in String',
    }),
    servicePrice: z.number({
      required_error: 'Service Price is Required',
      invalid_type_error: 'Service Price must be in Number',
    }),
  }),
});

export const RepairServiceValidation = {
  createService,
};
