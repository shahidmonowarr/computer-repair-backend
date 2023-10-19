import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  IProfileUpdateRequest,
  IUpdateUserResponse,
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

// Update my user Profile info
const updateMyUserInfo = async (
  userId: string,
  payload: IUserUpdateReqAndResponse
): Promise<IUpdateUserResponse> => {
  const existingUser = await prisma.user.findUnique({ where: { userId } });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You are  not a valid user!');
  }
  const { oldPassword, newPassword, email } = payload;

  const updatedData: { email?: string; password?: string } = {};

  if (oldPassword && newPassword) {
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isOldPasswordCorrect) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
    }

    const hashPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );
    updatedData.password = hashPassword;
  }

  if (email) {
    updatedData.email = email;
  }

  if (Object.keys(updatedData).length === 0) {
    return {
      message: 'No changes to update',
      updatedInfo: {},
    };
  }

  const result = await prisma.user.update({
    where: { userId },
    data: updatedData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User update failed');
  }

  return {
    message: 'User updated successfully',
    updatedInfo: updatedData,
  };
};

// Update user profile info
const updateProfileInfo = async (
  profileId: string,
  payload: IProfileUpdateRequest
): Promise<{
  message: string;
  updatedInfo: IProfileUpdateRequest;
}> => {
  const { firstName, lastName, profileImage, role, phoneNumber, address } =
    payload;

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

  if (phoneNumber !== undefined) {
    updateData.phoneNumber = phoneNumber;
  }

  if (address !== undefined) {
    updateData.address = address;
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

// Update my Profile info
const updateMyProfileInfo = async (
  profileId: string,
  payload: IProfileUpdateRequest
): Promise<{
  message: string;
  updatedInfo: IProfileUpdateRequest;
}> => {
  const { firstName, lastName, profileImage, role, phoneNumber, address } =
    payload;

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

  if (phoneNumber !== undefined) {
    updateData.phoneNumber = phoneNumber;
  }

  if (address !== undefined) {
    updateData.address = address;
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
  updateMyUserInfo,
  updateMyProfileInfo,
};
