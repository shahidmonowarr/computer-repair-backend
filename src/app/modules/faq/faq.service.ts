import { Faq } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  IFaqCreateRequest,
  IFaqResponse,
  IUpdateFaqRequest,
} from './faq.interface';

const createNewFaq = async (
  profileId: string,
  payload: IFaqCreateRequest
): Promise<IFaqResponse> => {
  //

  const result = await prisma.faq.create({
    data: {
      faqTitle: payload.faqTitle,
      faqDescription: payload.faqDescription,
      profileId,
    },
    select: {
      faqTitle: true,
      faqDescription: true,
      createdAt: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Creating Faq Failed');
  }

  return result;
};

const getAllFaqs = async (): Promise<Faq[]> => {
  const result = await prisma.faq.findMany({
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
  });

  return result;
};

const getFaqById = async (faqId: string): Promise<Faq | null> => {
  const result = await prisma.faq.findUnique({
    where: {
      faqId,
    },
    include: {
      profile: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq Not Found !!!');
  }

  return result;
};

const updateFaq = async (
  faqId: string,
  payload: Partial<IUpdateFaqRequest>
): Promise<Faq | null> => {
  const isExistFaq = await prisma.faq.findUnique({
    where: {
      faqId,
    },
  });

  if (!isExistFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq Not Found !!!');
  }

  const updateFaqData = {
    faqTitle: payload?.faqTitle,
    faqDescription: payload?.faqDescription,
  };

  const result = await prisma.faq.update({
    where: {
      faqId,
    },
    data: updateFaqData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Updating Faq Failed');
  }
  return result;
};

const deleteFaq = async (faqId: string): Promise<Faq | null> => {
  const isExistFaq = await prisma.faq.findUnique({
    where: {
      faqId,
    },
  });

  if (!isExistFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq Not Found !!!');
  }

  const result = await prisma.faq.delete({
    where: {
      faqId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Deleting Faq Failed');
  }
  return result;
};

export const FaqService = {
  createNewFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
