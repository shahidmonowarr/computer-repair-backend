import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/user.interface';
import { bookingFilterableFields } from './booking.constants';
import { bookingService } from './booking.service';

const createNewBooking = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await bookingService.createNewBooking(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Created Successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await bookingService.getAllBookings(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getMyBooking = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await bookingService.getMyBooking(profileId, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await bookingService.updateBooking(bookingId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully',
    data: result,
  });
});

const updateMyBookingStatus = catchAsync(
  async (req: Request, res: Response) => {
    const profileId = (req.user as IRequestUser).profileId;
    const { bookingId } = req.params;
    const result = await bookingService.updateMyBookingStatus(
      profileId,
      bookingId,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Updated successfully',
      data: result,
    });
  }
);

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await bookingService.deleteBooking(bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Deleted successfully ',
    data: result,
  });
});

export const bookingController = {
  createNewBooking,
  getAllBookings,
  updateBooking,
  updateMyBookingStatus,
  deleteBooking,
  getMyBooking,
};
