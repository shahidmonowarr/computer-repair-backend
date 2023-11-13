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

const getAllReviewAndRatings = async () => {
  const result = await prisma.reviewAndRatings.findMany({
    select: {
      reviewComment: true,
      reviewRating: true,
      createdAt: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileId: true,
          profileImage: true,
        },
      },
      service: {
        select: {
          serviceName: true,
          serviceId: true,
        },
      },
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
  }
  return result;
};

const getMyReviewsAndRatings = async (profileId: string) => {
  const result = await prisma.reviewAndRatings.findMany({
    where: {
      profileId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      reviewComment: true,
      reviewRating: true,
      createdAt: true,
      reviewId: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileId: true,
          profileImage: true,
        },
      },
      service: {
        select: {
          serviceName: true,
          serviceId: true,
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
