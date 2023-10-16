import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedBackValidation } from './feedback.validations';

const router = express.Router();

router.get('/', FeedbackController.getAllFeedbacks);

router.post(
  '/create',
  auth(Role.customer),
  validateRequest(FeedBackValidation.createFeedBack),
  FeedbackController.createNewFeedback
);

router.patch(
  '/:feedbackId',
  auth(Role.customer, Role.technician, Role.admin, Role.super_admin),
  validateRequest(FeedBackValidation.updateFeedBack),
  FeedbackController.updateFeedback
);

router.delete(
  '/:feedbackId',
  auth(Role.customer, Role.technician, Role.admin, Role.super_admin),
  FeedbackController.deleteFeedback
);

export const FeedbackRoutes = router;
