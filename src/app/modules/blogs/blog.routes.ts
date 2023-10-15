import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/create', BlogController.createBlog);
router.get('/', BlogController.getAllBlogs);
router.get('/:blogId', BlogController.getBlogById);

export const BlogRoutes = router;
