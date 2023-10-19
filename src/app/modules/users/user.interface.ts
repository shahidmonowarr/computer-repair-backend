import { Profile, Role } from '@prisma/client';

export type IRequestUser = {
  role: Role;
  userId: string;
  profileId: string;
  iat: number;
  exp: number;
};

export type IUsersResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile | null;
};

export type IProfileUpdateRequest = {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  role?: Role;
};

export type IUserUpdateReqAndResponse = {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
};
export type IUpdateUserResponse = {
  message: string;
  updatedInfo: { email?: string; password?: string };
};
