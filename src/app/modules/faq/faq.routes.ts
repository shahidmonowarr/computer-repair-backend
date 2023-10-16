import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';

const router = express.Router();

router.post(
  '/create',
  auth(Role.super_admin, Role.admin),
  validateRequest(FaqValidation.createFaq),
  FaqController.createNewFaq
);

router.get('/', FaqController.getAllFaqs);

router.get('/:faqId', FaqController.getFaqById);

router.patch(
  '/:faqId',
  validateRequest(FaqValidation.updateFaq),
  auth(Role.super_admin, Role.admin),
  FaqController.updateFaq
);

router.delete(
  '/:faqId',
  auth(Role.super_admin, Role.admin),
  FaqController.deleteFaq
);

export const FaqRoutes = router;
