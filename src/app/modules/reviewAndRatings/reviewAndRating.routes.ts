import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewAndRatingController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validations';

const router = express.Router();

router.post(
  '/create',
  auth(Role.customer),
  validateRequest(ReviewAndRatingValidation.createReviewAndRating),
  reviewAndRatingController.createNewRatingAndReview
);

router.get(
  '/my-reviews',
  auth(Role.customer),
  reviewAndRatingController.getMyReviewsAndRatings
);

router.get(
  '/',
  auth(Role.super_admin, Role.admin, Role.customer),
  reviewAndRatingController.getAllReviewAndRatings
);

router.patch(
  '/:reviewId',
  auth(Role.customer, Role.admin, Role.super_admin),
  reviewAndRatingController.updateReview
);

router.delete(
  '/:reviewId',
  auth(Role.customer, Role.admin, Role.super_admin),
  reviewAndRatingController.singleReviewDelete
);

export const reviewAndRatingRoutes = router;
