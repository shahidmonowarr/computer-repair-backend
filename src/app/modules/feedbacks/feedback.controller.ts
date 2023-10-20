import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackFilterableFields } from './feedback.constants';
import { FeedbackService } from './feedback.service';

const createNewFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.createNewFeedback(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully!',
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FeedbackFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await FeedbackService.getAllFeedbacks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FeedBack fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const { feedbackId } = req.params;
  const payload = req.body;
  const result = await FeedbackService.updateFeedback(feedbackId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const { feedbackId } = req.params;
  const result = await FeedbackService.deleteFeedback(feedbackId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const FeedbackController = {
  createNewFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
