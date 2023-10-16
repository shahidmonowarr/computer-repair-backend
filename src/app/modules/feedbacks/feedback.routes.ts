import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.get('/', FeedbackController.getAllFeedbacks);

router.post(
  '/create',
  auth(Role.customer),
  FeedbackController.createNewFeedback
);

router.patch(
  '/:feedbackId',
  auth(Role.customer, Role.technician, Role.admin, Role.super_admin),
  FeedbackController.updateFeedback
);

router.delete(
  '/:feedbackId',
  auth(Role.customer, Role.technician, Role.admin, Role.super_admin),
  FeedbackController.deleteFeedback
);

export const FeedbackRoutes = router;
