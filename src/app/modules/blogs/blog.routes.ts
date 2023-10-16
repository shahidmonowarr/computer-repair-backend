import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/create',
  auth(Role.customer),
  validateRequest(BlogValidation.createBlog),
  BlogController.createBlog
);
router.get('/', BlogController.getAllBlogs);
router.get('/:blogId', BlogController.getBlogById);
router.patch(
  '/:blogId',
  auth(Role.admin, Role.super_admin),
  validateRequest(BlogValidation.createBlog),
  BlogController.updateBlogById
);
router.delete(
  '/:blogId',
  auth(Role.admin, Role.super_admin),
  BlogController.deleteBlogById
);

export const BlogRoutes = router;
