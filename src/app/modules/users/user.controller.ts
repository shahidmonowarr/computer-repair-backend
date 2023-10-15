import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from './user.interface';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);

  const result = await UserService.getAllUsers(options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully!',
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as IRequestUser).userId;
  const result = await UserService.getMyProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

const updateProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const payload = req.body;
  const result = await UserService.updateProfileInfo(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
const updateMyProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const payload = req.body;
  const result = await UserService.updateProfileInfo(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const payload = req.body;
  const result = await UserService.updateUserInfo(userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  getMyProfile,
  updateProfileInfo,
  updateMyProfileInfo,
  updateUserInfo,
};
