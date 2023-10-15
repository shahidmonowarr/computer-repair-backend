import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { FaqService } from './faq.service';

const createNewFaq = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await FaqService.createNewFaq(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq created successfully!',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getAllFaqs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faqs fetched successfully!',
    data: result,
  });
});

const getFaqById = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;

  const result = await FaqService.getFaqById(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq fetched successfully!',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const result = await FaqService.updateFaq(faqId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq updated successfully!',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;

  await FaqService.deleteFaq(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully!',
  });
});

export const FaqController = {
  createNewFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
