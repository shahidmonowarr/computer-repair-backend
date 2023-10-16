import { z } from 'zod';

const createBlog = z.object({
  body: z.object({
    blogTitle: z.string({
      required_error: 'Blog Title is Required',
      invalid_type_error: 'Blog Title must be in String',
    }),
    blogDescription: z.string({
      required_error: 'Blog Description is Required',
      invalid_type_error: 'Blog Description must be in String',
    }),
    blogImage: z.string({
      required_error: 'Blog blogImage is Required',
      invalid_type_error: 'Blog Image must be in String',
    }),
  }),
});

export const BlogValidation = {
  createBlog,
};
