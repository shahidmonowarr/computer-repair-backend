import express from 'express';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post('/create', FaqController.createNewFaq);

router.get('/', FaqController.getAllFaqs);

router.get('/:faqId', FaqController.getFaqById);

router.patch('/:faqId', FaqController.updateFaq);

router.delete('/:faqId', FaqController.deleteFaq);

export const FaqRoutes = router;
