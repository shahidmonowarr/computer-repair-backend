import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post(
  '/create',
  auth(Role.super_admin, Role.admin),
  FaqController.createNewFaq
);

router.get('/', FaqController.getAllFaqs);

router.get('/:faqId', FaqController.getFaqById);

router.patch(
  '/:faqId',

  auth(Role.super_admin, Role.admin),
  FaqController.updateFaq
);

router.delete(
  '/:faqId',
  auth(Role.super_admin, Role.admin),
  FaqController.deleteFaq
);

export const FaqRoutes = router;
