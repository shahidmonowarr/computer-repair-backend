import { ReviewAndRatings } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  ICreateReviewAndRatingRequest,
  ICreateReviewAndRatingResponse,
  IUpdateReviewAndRatingRequest,
} from './reviewAndRating.interface';

const createNewRatingAndReview = async (
  profileId: string,
  payload: ICreateReviewAndRatingRequest
): Promise<ICreateReviewAndRatingResponse> => {
  //
  const isExisting = await prisma.service.findUnique({
    where: {
      serviceId: payload.serviceId,
    },
  });

  if (!isExisting) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');
  }

  const createdNewRatingAndReview = await prisma.reviewAndRatings.create({
    data: {
      reviewComment: payload.reviewComment,
      reviewRating: payload.reviewRating,
      serviceId: payload.serviceId,
      profileId,
    },
    select: {
      reviewComment: true,
      reviewRating: true,
      createdAt: true,
    },
  });
  if (!createdNewRatingAndReview) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Review and rating failed to add'
    );
  }

  return createdNewRatingAndReview;
};

const getAllReviewAndRatings = async (): Promise<ReviewAndRatings[]> => {
  const result = await prisma.reviewAndRatings.findMany({});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
  }
  return result;
};

const getMyReviewsAndRatings = async (
  profileId: string
): Promise<ReviewAndRatings[]> => {
  const result = await prisma.reviewAndRatings.findMany({
    where: {
      profile: {
        profileId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      service: {
        select: {
          serviceName: true,
        },
      },
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
  }
  return result;
};

const updateRatingAndReview = async (
  reviewId: string,
  payload: Partial<IUpdateReviewAndRatingRequest>
): Promise<ReviewAndRatings | null> => {
  const isExistReview = await prisma.reviewAndRatings.findUnique({
    where: {
      reviewId,
    },
  });

  if (!isExistReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found !!!');
  }

  const updateReview = {
    reviewComment: payload?.reviewComment,
    reviewRating: payload?.reviewRating,
  };

  const result = await prisma.reviewAndRatings.update({
    where: {
      reviewId,
    },
    data: updateReview,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review sUpdating Failed !!!');
  }
  return result;
};

const DeleteRatingAndReview = async (
  reviewId: string
): Promise<ReviewAndRatings | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExistFeedBack = await transactionClient.reviewAndRatings.findUnique(
      {
        where: {
          reviewId,
        },
      }
    );

    if (!isExistFeedBack) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
    }

    const feedBackDeleted = await transactionClient.reviewAndRatings.delete({
      where: {
        reviewId,
      },
    });

    return feedBackDeleted;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Deleted');
  }
  return result;
};

export const reviewAndRatingService = {
  createNewRatingAndReview,
  updateRatingAndReview,
  DeleteRatingAndReview,
  getAllReviewAndRatings,
  getMyReviewsAndRatings,
};
