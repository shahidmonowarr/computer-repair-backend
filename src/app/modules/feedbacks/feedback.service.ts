import { FeedBackForm, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  FeedbackSearchableFields,
  feedbackRelationalFields,
  feedbackRelationalFieldsMapper,
} from './feedback.constants';
import {
  IFeedBackFilterRequest,
  IFeedbackCreateRequest,
  IFeedbackCreateResponse,
  IFeedbackUpdateRequest,
} from './feedback.interface';

const createNewFeedback = async (
  payload: IFeedbackCreateRequest
): Promise<IFeedbackCreateResponse> => {
  const createdNewFeedback = await prisma.feedBackForm.create({
    data: {
      feedbackSubject: payload.feedbackSubject,
      feedbackDescription: payload.feedbackDescription,
    },
    select: {
      feedbackId: true,
      feedbackSubject: true,
      feedbackDescription: true,
      createdAt: true,
    },
  });
  if (!createdNewFeedback) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while creating feedback'
    );
  }

  return createdNewFeedback;
};

const getAllFeedbacks = async (
  filters: IFeedBackFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FeedBackForm[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FeedbackSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (feedbackRelationalFields.includes(key)) {
          return {
            [feedbackRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.FeedBackFormWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.feedBackForm.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.feedBackForm.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateFeedback = async (
  feedbackId: string,
  payload: Partial<IFeedbackUpdateRequest>
): Promise<FeedBackForm | null> => {
  const isExistFeedBack = await prisma.feedBackForm.findUnique({
    where: {
      feedbackId,
    },
  });

  if (!isExistFeedBack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FeedBack Not Found !!!');
  }

  const updateFeedback = {
    feedbackComment: payload?.feedbackComment,
    serviceId: payload?.serviceId,
  };

  const result = await prisma.feedBackForm.update({
    where: {
      feedbackId,
    },
    data: updateFeedback,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FeedBack Updating Failed !!!');
  }
  return result;
};

const deleteFeedback = async (
  feedbackId: string
): Promise<FeedBackForm | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExistFeedBack = await transactionClient.feedBackForm.findUnique({
      where: {
        feedbackId,
      },
    });

    if (!isExistFeedBack) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feed Back Not Found');
    }

    const feedBackDeleted = await transactionClient.feedBackForm.delete({
      where: {
        feedbackId,
      },
    });

    return feedBackDeleted;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feed Back Not Deleted');
  }
  return result;
};

export const FeedbackService = {
  createNewFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
