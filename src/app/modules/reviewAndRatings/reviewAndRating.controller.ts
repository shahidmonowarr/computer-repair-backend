import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { reviewAndRatingService } from './reviewAndRating.service';

const createNewRatingAndReview = catchAsync(
  async (req: Request, res: Response) => {
    const profileId = (req.user as IRequestUser).profileId;
    const result = await reviewAndRatingService.createNewRatingAndReview(
      profileId,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Created Successfully',
      data: result,
    });
  }
);

const getAllReviewAndRatings = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reviewAndRatingService.getAllReviewAndRatings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'fetched successfully',
      data: result,
    });
  }
);

const getMyReviewsAndRatings = catchAsync(
  async (req: Request, res: Response) => {
    const profileId = (req.user as IRequestUser).profileId;
    const result = await reviewAndRatingService.getMyReviewsAndRatings(
      profileId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'fetched successfully',
      data: result,
    });
  }
);

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await reviewAndRatingService.updateRatingAndReview(
    reviewId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Updated successfully',
    data: result,
  });
});

const singleReviewDelete = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await reviewAndRatingService.DeleteRatingAndReview(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Deleted successfully',
    data: result,
  });
});

export const reviewAndRatingController = {
  createNewRatingAndReview,
  updateReview,
  singleReviewDelete,
  getAllReviewAndRatings,
  getMyReviewsAndRatings,
};
