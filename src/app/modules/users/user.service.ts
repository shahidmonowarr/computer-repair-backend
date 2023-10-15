import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  IProfileUpdateRequest,
  IUserUpdateReqAndResponse,
  IUsersResponse,
} from './user.interface';

const getAllUsers = async (options: IPaginationOptions) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      userId: true,
      email: true,
      createdAt: true,
      profile: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const total = await prisma.user.count();

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

const getUserById = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      email: true,
      createdAt: true,
      profile: true,
    },
  });

  return result;
};

const updateUserInfo = async (
  userId: string,
  payload: IUserUpdateReqAndResponse
): Promise<IUserUpdateReqAndResponse> => {
  const { email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const updateData: { email?: string; password?: string } = {};

  if (email !== undefined) {
    updateData.email = email;
  }

  if (password !== undefined) {
    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds)
    );
    updateData.password = hashPassword;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required for update'
    );
  }

  const result = await prisma.user.update({
    where: {
      userId,
    },
    data: updateData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User update failed');
  }

  return updateData;
};

const updateProfileInfo = async (
  profileId: string,
  payload: IProfileUpdateRequest
): Promise<{
  message: string;
  updatedInfo: IProfileUpdateRequest;
}> => {
  const { firstName, lastName, profileImage, role } = payload;

  if ('profileId' in payload) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile Id cannot be updated');
  }

  // Check if the profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: {
      profileId,
    },
  });

  if (!existingProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');
  }

  const updateData: Partial<IProfileUpdateRequest> = {};

  if (firstName !== undefined) {
    updateData.firstName = firstName;
  }

  if (lastName !== undefined) {
    updateData.lastName = lastName;
  }

  if (profileImage !== undefined) {
    updateData.profileImage = profileImage;
  }

  if (role !== undefined) {
    updateData.role = role;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required for update'
    );
  }

  // Update the profile
  const result = await prisma.profile.update({
    where: {
      profileId,
    },
    data: updateData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile update failed');
  }

  return {
    message: 'Profile updated successfully',
    updatedInfo: updateData,
  };
};

const getMyProfile = async (userId: string): Promise<IUsersResponse | null> => {
  const result = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      email: true,
      profile: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
  }

  return result;
};

const updateMyProfileInfo = async (
  profileId: string,
  payload: IProfileUpdateRequest
): Promise<{
  message: string;
  updatedInfo: IProfileUpdateRequest;
}> => {
  const { firstName, lastName, profileImage, role } = payload;

  if ('profileId' in payload) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile Id cannot be updated');
  }

  // Check if the profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: {
      profileId,
    },
  });

  if (!existingProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found!');
  }

  const updateData: Partial<IProfileUpdateRequest> = {};

  if (firstName !== undefined) {
    updateData.firstName = firstName;
  }

  if (lastName !== undefined) {
    updateData.lastName = lastName;
  }

  if (profileImage !== undefined) {
    updateData.profileImage = profileImage;
  }

  if (role !== undefined) {
    updateData.role = role;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one field is required for update'
    );
  }

  // Update the profile
  const result = await prisma.profile.update({
    where: {
      profileId,
    },
    data: updateData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile update failed');
  }

  return {
    message: 'Profile updated successfully',
    updatedInfo: updateData,
  };
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateProfileInfo,
  getMyProfile,
  updateUserInfo,
  updateMyProfileInfo,
};
