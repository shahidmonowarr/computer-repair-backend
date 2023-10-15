import { Role } from '@prisma/client';

export type IUserCreate = {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber: string;
  expertise: string;
  specializationId: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ITokenData = {
  userId: string;
  role: Role;
  profileId: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
