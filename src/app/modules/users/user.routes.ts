import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/my-profile',
  auth(Role.super_admin, Role.admin, Role.technician, Role.customer),
  UserController.getMyProfile
);
router.get(
  '/:userId',
  auth(Role.super_admin, Role.admin),
  UserController.getUserById
);
router.get('/', auth(Role.super_admin, Role.admin), UserController.getAllUsers);

// Update user profile info
router.patch(
  '/update-profile/:profileId',
  auth(Role.super_admin, Role.admin),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfileInfo
);

// Update my user info
router.patch(
  '/update-my-email-password',
  auth(Role.super_admin, Role.admin, Role.customer),
  validateRequest(UserValidation.updateUser),
  UserController.updateUserInfo
);

// Update my profile info
router.patch(
  '/update-my-profile',
  auth(Role.super_admin, Role.admin, Role.technician, Role.customer),
  validateRequest(UserValidation.updateUser),
  UserController.updateMyProfileInfo
);

export const UserRoutes = router;
