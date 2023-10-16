import { z } from 'zod';

const createReviewAndRating = z.object({
  body: z.object({
    reviewComment: z.string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment must be in   string',
    }),

    reviewRating: z.string({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be in   string',
    }),
    serviceId: z.string({
      required_error: 'Service Id is required',
      invalid_type_error: 'Service Id must be in   string',
    }),
  }),
});

const updateReviewAndRating = z.object({
  body: z.object({
    reviewComment: z
      .string({
        required_error: 'Comment is required',
        invalid_type_error: 'Comment must be in   string',
      })
      .optional(),

    reviewRating: z
      .string({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be in   string',
      })
      .optional(),
  }),
});

export const ReviewAndRatingValidation = {
  createReviewAndRating,
  updateReviewAndRating,
};
