"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBackValidation = void 0;
const zod_1 = require("zod");
const createFeedBack = zod_1.z.object({
    body: zod_1.z.object({
        feedbackSubject: zod_1.z.string({
            required_error: ' Feedback subject  is required',
            invalid_type_error: 'Feedback  subject  must be in   string',
        }),
        feedbackDescription: zod_1.z.string({
            required_error: 'feedbackDescription Id is required',
            invalid_type_error: 'feedbackDescription Id must be in   string',
        }),
    }),
});
const updateFeedBack = zod_1.z.object({
    body: zod_1.z.object({
        feedbackSubject: zod_1.z
            .string({
            required_error: ' Feedback subject  is required',
            invalid_type_error: 'Feedback  subject  must be in   string',
        })
            .optional(),
        feedbackDescription: zod_1.z
            .string({
            required_error: 'feedbackDescription Id is required',
            invalid_type_error: 'feedbackDescription Id must be in   string',
        })
            .optional(),
    }),
});
exports.FeedBackValidation = {
    createFeedBack,
    updateFeedBack,
};
