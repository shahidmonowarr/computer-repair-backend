import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SlotService } from './slots.service';

const createNewSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotService.createSlot(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot created successfully!',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotService.getAllSlots();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slots retrieved successfully!',
    data: result,
  });
});

const getSingleSlot = catchAsync(async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const result = await SlotService.getSingleSlot(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot retrieved successfully!',
    data: result,
  });
});

const updateSlot = catchAsync(async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const result = await SlotService.updateSlot(slotId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot updated successfully!',
    data: result,
  });
});

const deleteSlot = catchAsync(async (req: Request, res: Response) => {
  const { slotId } = req.params;
  const result = await SlotService.deleteSlot(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot deleted successfully!',
    data: result,
  });
});

export const SlotController = {
  createNewSlot,
  getAllSlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};
