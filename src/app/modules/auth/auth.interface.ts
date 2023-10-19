import { Role } from '@prisma/client';

export type IUserCreate = {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  password: string;
  role: Role;
  expertise: string;
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
  email: string;
  profileId: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
