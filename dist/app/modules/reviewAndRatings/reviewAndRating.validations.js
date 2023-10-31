"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingValidation = void 0;
const zod_1 = require("zod");
const createReviewAndRating = zod_1.z.object({
    body: zod_1.z.object({
        reviewComment: zod_1.z.string({
            required_error: 'Comment is required',
            invalid_type_error: 'Comment must be in   string',
        }),
        reviewRating: zod_1.z.string({
            required_error: 'Rating is required',
            invalid_type_error: 'Rating must be in   string',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
            invalid_type_error: 'Service Id must be in   string',
        }),
    }),
});
const updateReviewAndRating = zod_1.z.object({
    body: zod_1.z.object({
        reviewComment: zod_1.z
            .string({
            required_error: 'Comment is required',
            invalid_type_error: 'Comment must be in   string',
        })
            .optional(),
        reviewRating: zod_1.z
            .string({
            required_error: 'Rating is required',
            invalid_type_error: 'Rating must be in   string',
        })
            .optional(),
    }),
});
exports.ReviewAndRatingValidation = {
    createReviewAndRating,
    updateReviewAndRating,
};
