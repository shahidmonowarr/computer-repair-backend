"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlog = zod_1.z.object({
    body: zod_1.z.object({
        blogTitle: zod_1.z.string({
            required_error: 'Blog Title is Required',
            invalid_type_error: 'Blog Title must be in String',
        }),
        blogDescription: zod_1.z.string({
            required_error: 'Blog Description is Required',
            invalid_type_error: 'Blog Description must be in String',
        }),
        blogImage: zod_1.z.string({
            required_error: 'Blog blogImage is Required',
            invalid_type_error: 'Blog Image must be in String',
        }),
    }),
});
exports.BlogValidation = {
    createBlog,
};
