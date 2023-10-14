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
