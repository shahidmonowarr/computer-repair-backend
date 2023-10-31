"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqValidation = void 0;
const zod_1 = require("zod");
const createFaq = zod_1.z.object({
    body: zod_1.z.object({
        faqTitle: zod_1.z.string({
            required_error: 'Faq Title  is required',
            invalid_type_error: 'Faq Title must be in   string',
        }),
        faqDescription: zod_1.z.string({
            required_error: 'Faq Description   is required',
            invalid_type_error: 'Faq Description must be in   string',
        }),
    }),
});
const updateFaq = zod_1.z.object({
    body: zod_1.z.object({
        faqTitle: zod_1.z
            .string({
            invalid_type_error: 'Faq Title must be in   string',
        })
            .optional(),
        faqDescription: zod_1.z
            .string({
            invalid_type_error: 'Faq Description must be in   string',
        })
            .optional(),
    }),
});
exports.FaqValidation = {
    createFaq,
    updateFaq,
};
