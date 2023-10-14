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
