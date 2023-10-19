import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  ITokenData,
  IUserCreate,
  IUserLogin,
} from './auth.interface';

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

const userLogin = async (
  loginData: IUserLogin
): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      userId: true,
      email: true,
      password: true,
      profile: {
        select: {
          role: true,
          profileId: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect !!');
  }

  const tokenData: ITokenData = {
    userId: isUserExist.userId,
    role: isUserExist?.profile?.role as Role,
    email: isUserExist.email,
    profileId: isUserExist.profile?.profileId as string,
  };

  const accessToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  console.log(token, 'token is here=========');

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    select: {
      userId: true,
      email: true,
      password: true,
      profile: {
        select: {
          role: true,
          profileId: true,
        },
      },
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!!');
  }

  type TokenData = {
    userId: string;
    role: Role;
    email: string;
    profileId: string;
  };

  const tokenData: TokenData = {
    userId: isUserExist.userId,
    role: isUserExist?.profile?.role as Role,
    email: isUserExist.email,
    profileId: isUserExist?.profile?.profileId as string,
  };

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createNewUser,
  userLogin,
  refreshToken,
};
