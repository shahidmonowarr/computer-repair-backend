import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUserCreate } from './auth.interface';

const createNewUser = async (data: IUserCreate) => {
  const { password, email } = data;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  // transaction start
  const newUser = await prisma.$transaction(async transactionClient => {
    const isUserExist = await transactionClient.user.findFirst({
      where: { email },
    });

    if (isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');
    }

    const createdProfile = await transactionClient.profile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage!,
        role: data.role!,
        phoneNumber: '',
      },
      select: {
        profileId: true,
        role: true,
      },
    });

    if (createdProfile.role == Role.technician) {
      await transactionClient.technician.create({
        data: {
          expertise: data.expertise,
          specializationId: data.specializationId,
          profileId: createdProfile.profileId,
        },
        select: {
          profileId: true,
          createdAt: true,
        },
      });
    }

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          connect: {
            profileId: createdProfile.profileId,
          },
        },
      },
      select: {
        profileId: true,
        createdAt: true,
        email: true,
        userId: true,
      },
    });

    if (!createdUser || !createdProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Creating New User Failed');
    }

    return createdUser;
  });

  return newUser;
};

export const AuthService = {
  createNewUser,
};
