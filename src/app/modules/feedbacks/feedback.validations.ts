import { z } from 'zod';

const createFeedBack = z.object({
  body: z.object({
    feedbackComment: z.string({
      required_error: ' Feedback Comment  is required',
      invalid_type_error: ' Feedback Comment must be in   string',
    }),
    serviceId: z.string({
      required_error: 'Service Id is required',
      invalid_type_error: 'Service Id must be in   string',
    }),
  }),
});

const updateFeedBack = z.object({
  body: z.object({
    feedbackComment: z
      .string({
        invalid_type_error: ' Feedback Comment must be in   string',
      })
      .optional(),
    serviceId: z
      .string({
        invalid_type_error: 'Service Id must be in   string',
      })
      .optional(),
  }),
});

export const FeedBackValidation = {
  createFeedBack,
  updateFeedBack,
};
