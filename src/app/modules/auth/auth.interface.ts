import { Role } from '@prisma/client';

export type IUserCreate = {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  password: string;
  role: Role;
  expertise: string;
  specializationId: string;
};
